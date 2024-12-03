const fs = require("fs-extra");
const path = require("path");
const getBuildFilePath = require("./utils/getBuildFilePath");
const htmlMinifier = require("html-minifier");
const { escapePreCode } = require("./utils/getEscapeHtml");
const addImageAltText = require("./utils/addImgAltText");
const JsonldSchemas = require("./utils/jsonldSchemas");

class HtmlGenerator {
  constructor(doc) {
    this.jsonld = new JsonldSchemas(doc);
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
    this.integrations = doc.integrations;
    this.googleTagManager = doc?.integrations.googleTagManager ?? "";
    this.themeColor = doc.themeColor;
    this.pwaEnabled = doc.pwa.enabled;
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
    const { googleAnalytics } = this.integrations;
    if (googleAnalytics && typeof googleAnalytics === "string") {
      return `
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "${googleAnalytics}");
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
  #getBingWebmaster() {
    const { bingWebmasters } = this.integrations;
    if (bingWebmasters === "") return "";
    return `<meta name="msvalidate.01" content="${bingWebmasters}" />`;
  }

  /**
   * Return google webmaster verification meta tag
   * @returns {string}
   */
  #getGoogleWebmaster() {
    const { googleWebmasters } = this.integrations;
    if (googleWebmasters === "") return "";
    return `<meta name="google-site-verification" content="${googleWebmasters}" />`;
  }

  /**
   * Return hotjar tracking script
   * @returns {string}
   */
  #getHotjarAnalytics() {
    const { hotjarAnalytics } = this.integrations;
    if (hotjarAnalytics === "") return "";

    return `<script>
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments);};
              h._hjSettings={hjid:"${hotjarAnalytics}",hjsv:6};
              a=o.getElementsByTagName("head")[0];
              r=o.createElement("script");r.async=1;
              r.src=t+j+"?sv="+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js');
          </script>`;
  }

  #getFacebookPixel() {
    const { facebookPixel: facebookPixelCode } = this.integrations;
    if (facebookPixelCode === "") return "";

    return `<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments);};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s);}(window, document,"script",
  "https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", "${facebookPixelCode}"); // Replace 'YOUR_PIXEL_ID' with your Pixel ID
  fbq("track", "PageView");
</script>
<noscript>
  <img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${facebookPixelCode}&ev=PageView&noscript=1"/>
</noscript>
`;
  }

  #getMicroSoftClarity() {
    const { microsoftClarityCode } = this.integrations;
    if (microsoftClarityCode === "") return "";
    return `<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${microsoftClarityCode}");
</script>
`;
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="${this.themeColor}">

        ${this.jsonld.getBlogSchema()}
        
        ${this.jsonld.getBreadCrumbs()}
        
        ${this.jsonld.getWebsiteSchema()}
        
        ${this.jsonld.getOrganizationSchema()}

        ${this.jsonld.getSoftwareSchema()}
        
        ${this.head}
        ${this.#getBingWebmaster()}
        ${this.#getGoogleWebmaster()}
        ${this.#getGoogleAnalytics()}
        ${this.#getHotjarAnalytics()}
        ${this.#getFacebookPixel()}
        ${this.#getMicroSoftClarity()}

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

  /**
   * Generates the PWA service worker registration script.
   * @returns {string} The script to register the service worker, or an empty string if PWA is not enabled.
   */
  #getPWAScript() {
    if (!this.pwaEnabled) return ""; // Return empty string if PWA is not enabled

    return `<script>
    if ("serviceWorker" in navigator) {
      // Ensure the page is served over HTTPS before registering service worker
        navigator.serviceWorker.register("/serviceworker.js")
          .catch((error) => {
            console.error("Service worker registration failed:", error);
          });
    }
  </script>`;
  }

  #getHtml() {
    const headGTM =
      this.googleTagManager !== ""
        ? "<script async " +
          `src="https://www.googletagmanager.com/gtm.js?id=${this.googleTagManager}" >` +
          "</script>"
        : "";

    const bodyGTM =
      this.googleTagManager !== ""
        ? "<noscript>" +
          "<iframe " +
          `src="https://www.googletagmanager.com/ns.html?id=${this.googleTagManager}"\n ` +
          ' height="0" width="0" style="display:none;visibility:hidden"></iframe>' +
          "</noscript>"
        : "";

    let html = `
        <!DOCTYPE html>
        <html lang="${this.pageLanguage}">
            <head>
            ${headGTM}
            ${this.#getHeadTags()}
            </head>
            <body>
                ${bodyGTM}
                ${this.bodyContent}
                ${this.afterBodyContent}
                ${this.#getPWAScript()}
            </body>
        </html>
        `;

    html = escapePreCode(html);

    html = addImageAltText(html);

    return html;
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
