/** @typedef {import('../types/types').pageConfig} pageConfig */
/** @typedef {import('../types/types').PageContentType} PageContentType */
/** @typedef {import('../types/types').pageOptions} pageOptions */

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

class ApSSG {
  #FWC = new FWC({ cleanBeforeCopy: true });
  #fwcPaths = [
    { src: "src/assets/site", dest: "build/assets/site" },
    { src: "src/assets/uploads", dest: "build/assets/uploads" },
  ];

  constructor() {
    this.sitemapData = [];
  }

  // @ts-check
  /**
   * Generate Page in build folder
   * @param {pageConfig} doc - The document configuration
   * @param {PageContentType} content - The HTML content for the page
   * @param {pageOptions} options - Options for modifying the page
   * @returns {Promise<string>}
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
   * Run ApSSG to generate build
   * @returns {Promise<void>}
   */
  async generate() {
    logInfo(
      "🚀 AP-SSG: File generation process has started. Preparing your static site..."
    );

    if (userConfig.isProduction === true) {
      fs.emptydirSync(path.join(process.cwd(), "build"));
    }

    executePagesFiles()
      .then(async () => {
        this.#addPathsToFWC();
        await this.#FWC.copy();

        const sitemap = new SiteMapGenerator({
          baseUrl: userConfig.websiteUrl, // change with your website domain extension
          outDir: "build", // default is build
          removeIndexExtension: true, // remove /index.html or any extension from URL
        });

        sitemap.addPages(this.sitemapData);
        const { sitemapLink } = sitemap.generate();

        await generateRobotsTxt(sitemapLink);

        if (userConfig.pwa.enabled === true) {
          await generateManifestFile(userConfig.pwa);
          await generateServiceWorkerFile(userConfig.pwa);
        } else if (
          userConfig.pwa.enabled === false &&
          userConfig.isDevelopment
        ) {
          removeSWandManifest();
        }

        runGulp();
        runWebpack();
        await runGulp();
        await runWebpack();

        let message =
          "\n✨ Build Complete: AP-SSG has successfully generated your static site! 🎉\n";
        message += "🔹 Files Created:\n";
        message += "   - Static HTML files\n";
        message += "   - Minified JavaScript and CSS files\n";
        message += "   - robots.txt\n";
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
      })
      .catch((error) => {
        console.error(
          "Error during file execution or sitemap generation:",
          error
        );
      });
  }
}

module.exports = ApSSG;
