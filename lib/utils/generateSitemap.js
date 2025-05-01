const SiteMapGenerator = require("ap-sitemap");
const userConfig = require("../configs/userConfig");

/**
 * This function generates a sitemap using the `SiteMapGenerator` class and returns the generated sitemap link.
 * @param {Array} sitemapData - The data for the sitemap.
 * @returns {Promise<string>} - The generated sitemap link.
 */
async function generateSitemap(sitemapData) {
  try {
    const sitemap = new SiteMapGenerator({
      baseUrl: userConfig.websiteUrl,
      outDir: "build",
      removeIndexExtension: true,
    });

    sitemap.addPages(sitemapData);

    const { sitemapLink } = sitemap.generate();

    return sitemapLink;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    throw new Error("Sitemap generation failed.");
  }
}

module.exports = generateSitemap;
