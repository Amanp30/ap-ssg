const fs = require("fs-extra");
const path = require("path");
const getBuildFilePath = require("./utils/getBuildFilePath");
const htmlMinifier = require("html-minifier");

class HtmlGenerator {
  constructor(doc) {
    this.head = "";
    this.afterBodyContent = "";
    this.bodyContent = "";
    this.filePath = getBuildFilePath(doc.filePath);
    this.title = doc?.title || "Document";
    this.url = doc.url;
    this.description = doc.description;
    this.keywords = doc.keywords;
    this.author = doc.author;
    this.ogImage = doc.ogImage;
    this.twitterHandle = doc.twitterHandle;
    this.pageLanguage = doc.pageLanguage;
    // Default shouldAllowIndexing and shouldFollowLinks to true if not provided
    this.shouldAllowIndexing = doc.shouldAllowIndexing ?? true; // Default true
    this.shouldFollowLinks = doc.shouldFollowLinks ?? true; // Default true
  }

  /**
   * Append tags in head section of the page
   * @param arr
   */
  insertHead(arr) {
    this.#appender(arr, "head");
  }

  /**
   * Append tags in the end of page body section
   * @param arr
   */
  insertBody(arr) {
    this.#appender(arr, "afterBodyContent");
  }

  #appender(arr, constructorKey) {
    arr?.map((item) => {
      this[constructorKey] += item + "\n";
    });
  }

  /**
   * Pass content to add between page body tag
   * @param {string} content
   */
  setBodyContent(content) {
    this.bodyContent = content;
  }

  /**
   * Get head tags
   * @returns {string}
   */
  #getHeadTags() {
    const robotsContent = [
      this.shouldAllowIndexing ? "index" : "noindex",
      this.shouldFollowLinks ? "follow" : "nofollow",
    ].join(", ");

    return `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/site/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/site/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/site/favicon-16x16.png">
        <link rel="manifest" href="/assets/site/site.webmanifest">


        ${this.head}

        <title>${this.title}</title>
        <link rel="canonical" href="${this.url}">
        <meta name="description" content="${this.description}">
        ${
          this.keywords
            ? ` <meta name="keywords" content="${this.keywords}">`
            : ""
        }
        <meta name="author" content="${this.author}">
        <meta name="robots" content="${robotsContent}">



        <!-- Open Graph Meta Tags -->
        <meta property="og:title" content="${this.title}">
        <meta property="og:description" content="${this.description}">
        <meta property="og:url" content="${this.url}">
        <meta property="og:type" content="website">
        <meta property="og:image" content="${this.ogImage}">
        <meta property="og:image:alt" content="${this.title}">


        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${this.title}">
        <meta name="twitter:description" content="${this.description}">
        <meta name="twitter:image" content="${this.ogImage}">
        <meta name="twitter:image:alt" content="${this.title}">
        ${
          this.twitterHandle
            ? `<meta name="twitter:site" content="${this.twitterHandle}">`
            : ""
        }   
     

    `;
  }

  #getHtml() {
    return `
        <!DOCTYPE html>
        <html lang="${this.pageLanguage}">
            <head>
            ${this.#getHeadTags()}
            </head>
            <body>
                ${this.bodyContent}
                ${this.afterBodyContent}
            </body>
        </html>
        `;
  }

  /**
   * Write file and ensure dir
   * @param {string} filePath
   * @param {string} htmlContent
   * @returns {Promise<void>}
   */
  async writeToFile(filePath, htmlContent) {
    try {
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, htmlContent.trim(), "utf8");
    } catch (err) {
      console.error("Error writing the file:", err);
    }
  }


  /**
   * Generate minimized html file
   * @returns {Promise<boolean>}
   */
  async generate() {
    try {


      const options = {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true, // Enable minification of JS
        minifyCSS: true,
      };

      // Configure UglifyJS options for function name mangling
      options.minifyJS = {
        compress: {
          comparisons: false,
        },
        mangle: {
          toplevel: true,
          reserved: ["gtag"], // Reserve 'gtag' function name
          keep_fnames: false,
        },
      };

      const minifiedHtml = htmlMinifier.minify(this.#getHtml(), options);

      await this.writeToFile(this.filePath, minifiedHtml);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = HtmlGenerator;
