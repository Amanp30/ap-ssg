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
const removeSWandManifest = require("./utils/removeSWandManifest");
const cleanBuildFolder = require("./utils/cleanBuildFolder");
const execPostBuild = require("./utils/execPostBuild");
const { getBuildDirPath } = require("./configs/paths");
const generateSitemap = require("./utils/generateSitemap");
const validatePageOptions = require("./configs/pageOptions");
const generateErrorPage = require("./utils/generate404");

class ApSSG {
  #FWC = new FWC({ cleanBeforeCopy: true });
  #fwcPaths = [
    { src: "src/assets/site", dest: `${userConfig.outDir}/assets/site` },
    { src: "src/assets/uploads", dest: `${userConfig.outDir}/assets/uploads` },
  ];

  constructor() {
    this.sitemapData = [];
  }

  /**
   * Generate a page in the build folder
   * @param {import('../types/types').PageConfig} doc - The document configuration object
   * @param {import('../types/types').PageContentType} content - The HTML content for the page
   * @param {import('../types/types').PageOptions} [options] - Optional settings for modifying the page
   * @returns {Promise<string>} Message indicating the file was generated
   */
  async addPage(doc, content, options) {
    try {
      const validDoc = validateDocumentConfig(doc);
      // add data to use for sitemap generation
      const { url, updatedAt, priority, changefreq, shouldAllowIndexing } =
        validDoc;
      if (shouldAllowIndexing) {
        this.sitemapData.push({ url, updatedAt, priority, changefreq });
      }

      const hg = new HtmlGenerator(validDoc);
      hg.setBodyContent(content);

      const { insertHead = [], insertBodyEnd = [] } =
        validatePageOptions(options) || {};

      hg.insertHead(insertHead);
      hg.insertBody(insertBodyEnd);

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

    try {
      await cleanBuildFolder();

      await executePagesFiles();
      this.#addPathsToFWC();
      await this.#FWC.copy();

      const sitemapLink = await generateSitemap(this.sitemapData);

      await generateErrorPage();

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

      console.log(
        `✅ Build completed! Files are ready to deploy in: ${getBuildDirPath()}`
      );

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
