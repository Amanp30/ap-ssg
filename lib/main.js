const SiteMapGenerator = require("ap-sitemap");
const HtmlGenerator = require("./htmlGenerator");
const validateDocumentConfig = require("./configs/docConfig");
const { logInfo } = require("./utils/logMessage");
const executePagesFiles = require("./utils/executePagesFiles");
const { FWC } = require("./utils/fwc");
const userConfig = require("./configs/userConfig");
const runGulp = require("../gulpfile");
const runWebpack = require("./utils/runWebpack");
const { generateRobotsTxt } = require("./utils/generateRobotsTxt");
const { generateServiceWorkerFile } = require("./utils/generateSW");
const { generateManifestFile } = require("./utils/generateManifestFile");
const path = require("path");

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
   * Generate Page in build folder
   * @param {object} doc
   * @param {string} content
   * @param {object} options
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
      "🚀 AP-SSG: File generation process has started. Preparing your static site...",
    );
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
        }

        runGulp();
        runWebpack();

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
          error,
        );
      });
  }
}

module.exports = ApSSG;
