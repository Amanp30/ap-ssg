const SiteMapGenerator = require("ap-sitemap");
const HtmlGenerator = require("./htmlGenerator");
const validateDocumentConfig = require("./configs/docConfig");
const { logSuccess, logInfo } = require("./utils/logMessage");
const executePagesFiles = require("./utils/executePagesFiles");
const { FWC } = require("./utils/fwc");
const userConfig = require("./configs/userConfig");
const runGulp = require("../gulpfile");
const runWebpack = require("./utils/runWebpack");

class ApSSG {
  #FWC = new FWC();
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
   * @returns {Promise<void>}
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
    logInfo("ap-ssg file generation started");
    executePagesFiles()
      .then(() => {
        this.#addPathsToFWC();
        this.#FWC.copy();

        const sitemap = new SiteMapGenerator({
          baseUrl: userConfig.websiteUrl, // change with your website domain extension
          outDir: "build", // default is build
          removeIndexExtension: true, // remove /index.html or any extension from URL
        });

        sitemap.addPages(this.sitemapData);
        sitemap.generate();

        runGulp();
        runWebpack()

        logSuccess(`File generation complete. See here ${process.cwd()}/build`);
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
