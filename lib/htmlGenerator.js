const fs = require("fs-extra");
const path = require("path");
const getBuildFilePath = require("./utils/getBuildFilePath");
const htmlMinifier = require("html-minifier");
const { escapePreCode } = require("./utils/getEscapeHtml");

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
    this.googleAnalytics = doc.googleAnalytics;
    this.bingAnalytics = doc.bingAnalytics;
    this.themeColor = doc.themeColor;
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
   * Generates the Google Analytics script for inclusion in the head tag.
   * @returns {string} Google Analytics script as a string, or an empty string if the tracking ID is invalid.
   */
  #getGoogleAnalytics() {
    if (this.googleAnalytics && typeof this.googleAnalytics === "string") {
      return `
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=${this.googleAnalytics}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '${this.googleAnalytics}');
        </script>
        <!-- End Google Analytics -->
        `;
    }
    return "";
  }

  /**
   * Generates the Bing Webmaster Tools meta tag for verification.
   *
   * This function checks if a valid Bing verification ID is provided and returns
   * the appropriate `<meta>` tag for Bing Webmaster Tools verification.
   *
   * @returns {string}
   * The meta tag for Bing Webmaster Tools verification, or an empty string
   * if no valid Bing verification ID is provided.
   */

  #getBingAnalytics() {
    if (this.bingAnalytics === "") return "";
    return `<meta name="msvalidate.01" content="${this.bingAnalytics}" />`;
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
        <meta name="theme-color" content="${this.themeColor}">



        ${this.head}
        ${this.#getGoogleAnalytics()}
        ${this.#getBingAnalytics()}

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
    const html = `
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

    return escapePreCode(html);
  }

  /**
   * Write file and ensure dir
   * @param htmlContent
   * @param filePath
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
        removeEmptyElements: true,
        removeEmptyAttributes: true,
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
          keep_fnames: true,
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
