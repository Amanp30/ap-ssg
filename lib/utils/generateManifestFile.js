const fs = require("fs-extra");
const path = require("path");
const {
  getBuildManifestFilePath,
  getBuildAssetsSiteDirPath,
} = require("../configs/paths");

exports.generateManifestFile = async function (config) {
  const assetsDir = getBuildAssetsSiteDirPath();
  const siteDirFiles = await fs.readdir(assetsDir);

  const requiredIcons = [
    "/assets/site/android-chrome-192x192.png",
    "/assets/site/android-chrome-512x512.png",
  ];

  const missingIcons = requiredIcons.filter(
    (icon) =>
      !siteDirFiles.includes(icon.replace("/assets/site", "").substring(1))
  );
  if (missingIcons.length > 0) {
    throw new Error(`Missing required icon files: ${missingIcons.join(", ")}`);
  }

  const screenshots = siteDirFiles
    .filter((file) => file.match(/^screen-\d+-\d+x\d+\.png$/))
    .sort((a, b) => {
      // Extract the number from the filename using regex
      const numA = parseInt(a.match(/screen-(\d+)-/)[1], 10);
      const numB = parseInt(b.match(/screen-(\d+)-/)[1], 10);
      return numA - numB; // Compare the numbers
    })
    .map((shot) => ({
      src: `/assets/site/${shot}`,
      sizes: `${shot.replace(/screen-\d+-/, "").replace(".png", "")}`,
      type: "image/png",
      platform: "all",
    }));

  const manifest = {
    name: config.name,
    short_name: config.short_name,
    description: config.description,
    start_url: config.start_url,
    display: config.display,
    display_override: [
      "window-controls-overlay",
      "standalone",
      "fullscreen",
      "minimal-ui",
    ],
    background_color: config.background_color,
    theme_color: config.theme_color,
    icons: [
      {
        src: "/assets/site/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/site/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: screenshots.length > 0 ? screenshots : undefined,
    orientation: config.orientation,
    lang: config.lang,
    scope: "/",
  };

  const manifestPath = getBuildManifestFilePath();

  // Use fs-extra to ensure the "build" directory exists
  fs.ensureDirSync(path.dirname(manifestPath));

  // Write the JSON object to the file with fs-extra
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
};

function sortScreenshots(screenshots) {
  return screenshots.sort((a, b) => {
    // Extract number from the 'src' string (e.g., 'screen-1', 'screen-2', ...)
    const numA = parseInt(a.src.match(/screen-(\d+)-/)[1], 10);
    const numB = parseInt(b.src.match(/screen-(\d+)-/)[1], 10);

    // Compare the numbers for sorting
    return numA - numB;
  });
}
