const SiteMapGenerator = require("ap-sitemap");
const HtmlGenerator = require("./htmlGenerator");
const validateDocumentConfig = require("./configs/docConfig");
const { logInfo } = require("./utils/logMessage");
const executePagesFiles = require("./utils/executePagesFiles");
const { FWC } = require("./utils/fwc");
const userConfig = require("./configs/userConfig");
const runGulp = require("./utils/gulpfile");
const runWebpack = require("./utils/runWebpack");
const { generateRobotsTxt } = require("./utils/generateRobotsTxt");
const { generateServiceWorkerFile } = require("./utils/generateSW");
const { generateManifestFile } = require("./utils/generateManifestFile");
const path = require("path");
const removeSWandManifest = require("./utils/removeSWandManifest");
const fs = require("fs-extra");
const cleanBuildFolder = require("./utils/cleanBuildFolder");
const execPostBuild = require("./utils/execPostBuild");

class ApSSG {
  #FWC = new FWC({ cleanBeforeCopy: true });
  #fwcPaths = [
    { src: "src/assets/site", dest: "build/assets/site" },
    { src: "src/assets/uploads", dest: "build/assets/uploads" },
  ];

  constructor() {
    this.sitemapData = [];
  }

  /**
   * Generate a page in the build folder
   * @param {Object} doc - The document configuration object
   * @param {string} content - The HTML content for the page
   * @param {Object} [options] - Optional settings for modifying the page
   * @param {string} [options.insertHead] - (Optional) HTML to insert inside <head>
   * @param {string} [options.insertBodyEnd] - (Optional) HTML to insert before </body>
   * @returns {Promise<string>} Message indicating the file was generated
   */
  async addPage(doc, content, options) {
    try {
      const validDoc = validateDocumentConfig(doc);
      // add data to use for sitemap generation
      const { url, updatedAt, priority, changefreq } = validDoc;
      this.sitemapData.push({ url, updatedAt, priority, changefreq });

      const hg = new HtmlGenerator(validDoc);
      hg.setBodyContent(content);
      hg.insertHead(options?.insertHead);
      hg.insertBody(options?.insertBodyEnd);
      await hg.generate();
      return `File generated for path "${validDoc.path}"`;
    } catch (error) {
      throw error;
    }
  }

  #addPathsToFWC() {
    this.#fwcPaths.forEach(({ src, dest }) => {
      this.#FWC.add(src, dest); // Assuming 'add' is a method of the 'FWC' class
    });
  }

  watch() {
    this.#addPathsToFWC();
    this.#FWC.watch();
  }

  /**
   * Run the build process and optionally exit based on the passed options.
   *
   * @param {Object} [options] - Optional settings for the build process.
   * @param {boolean} [options.shouldExitAfterBuild=false] - Whether to exit after the build completes. Defaults to `false`.
   * @returns {Promise<void>}
   */
  async generate(options = {}) {
    const { shouldExitAfterBuild = false } = options;

    logInfo(
      "🚀 AP-SSG: File generation process has started. Preparing your static site..."
    );

    // if (userConfig.isProduction) {
    //   fs.emptydirSync(path.join(process.cwd(), "build"));
    // }

    try {
      await cleanBuildFolder();

      await executePagesFiles();
      this.#addPathsToFWC();
      await this.#FWC.copy();

      const sitemap = new SiteMapGenerator({
        baseUrl: userConfig.websiteUrl,
        outDir: "build",
        removeIndexExtension: true,
      });

      sitemap.addPages(this.sitemapData);
      const { sitemapLink } = sitemap.generate();

      await generateRobotsTxt(sitemapLink);

      if (userConfig.pwa.enabled) {
        await generateManifestFile(userConfig.pwa);
        await generateServiceWorkerFile(userConfig.pwa);
      } else if (!userConfig.pwa.enabled && userConfig.isDevelopment) {
        removeSWandManifest();
      }

      await runGulp();
      await runWebpack();

      await execPostBuild();

      let message =
        "\n✨ Build Complete: AP-SSG has successfully generated your static site! 🎉\n";
      message +=
        "🔹 Files Created: \n   - Static HTML files\n   - Minified JavaScript and CSS files\n";
      message +=
        this.sitemapData.length > 50000
          ? "   - sitemap.xml (split into multiple files due to large size)\n"
          : "   - sitemap.xml\n";
      message += userConfig.pwa.enabled
        ? "   - Service Worker and Web App Manifest\n"
        : "";
      message +=
        "\n📁 Build Directory: " + path.join(process.cwd(), "build") + "\n";

      console.log(message);

      if (shouldExitAfterBuild) {
        process.exit(0); // Exit the process after build completion
      }
    } catch (error) {
      console.error(
        "Error during file execution or sitemap generation:",
        error
      );
      // Throw error so that it can be caught by the calling code
      throw new Error("Build process failed due to an error!"); // Throwing error with custom message
    }
  }
}

module.exports = ApSSG;
