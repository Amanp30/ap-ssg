## Setup `apssg.config.js` file

After completing the [installation](./installation.md), run the following command to automatically generate the config
file:

```shell
npx ap-ssg init
```

Alternatively, you can manually create the `apssg.config.js` file in the project root and define the configuration
object as shown below:

```javascript
module.exports = {
  mode: "development",
  commonCss: ["/assets/css/common.css"],
  websiteName: "Example Website",
  websiteDescription: "Example website description",
  productionURL: "https://example.com",
  developmentURL: "http://localhost:63342/ap-ssg/build",
  metaTitleTemplate: "%title - %siteName",
  themeColor: "#3d0665",
  websiteLang: "en-us",
  autoImgAlt: true,
  organization: {},
  integrations: {
    googleAnalytics: "",
    bingWebmasters: "",
    googleWebmasters: "",
    hotjarAnalytics: "",
    googleTagManager: "",
    facebookPixel: "",
    microsoftClarity: "",
  },
  pwa: {
    enabled: true,
    description: "Your pwa description",
    short_name: "Example",
    htmlFiles: ["index.html"],
    start_url: "/index.html",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3d0665",
    orientation: "portrait",
  },
};
```

## Configuration Fields Explained

### General Settings

#### `mode`

Defines the environment. Acceptable values are `production` or `development`.

- **`production`**: Uses the `productionURL`.
- **`development`**: Uses the `developmentURL`.

---

#### `websiteName` _(required)_

The name of your website.

---

#### `autoImgAlt` _(optional)_

Allow adding alt and title attributes to img tags using image src.

Default `true`

---

#### `commonCss` _(optional)_

This option allows you to add common CSS files to **every page** generated by the static site generator. It's especially useful for applying global styles like fonts, layouts, or any other styles that should be consistent across the entire website.

---

#### `commonJs` _(optional)_

This option allows you to add common JS files to **every page** generated by the static site generator. It's especially useful for applying global JS scripts like nav.js that should be consistent across the entire website.

---

#### `postBuild` Field

The `postBuild` field is an array of asynchronous functions that run after the build process completes. These functions are useful for tasks like generating additional files or modifying output directories.

### Example: Creating a Vercel Redirect Configuration

The following example shows a `postBuild` function that creates a `vercel.json` file with URL redirects:

```js
const postBuild = [
  async function createVercelRedirect() {
    try {
      const vercelConfig = {
        redirects: [
          {
            source: "/blogs",
            destination: "/posts.html",
            permanent: true,
          },
          {
            source: "/blogs/index.html",
            destination: "/posts.html",
            permanent: true,
          },
          {
            source: "/blogs/:slug*",
            destination: "/:slug*",
            permanent: true,
          },
        ],
      };

      const outputPath = path.join(process.cwd(), "build", "vercel.json");
      await fs.writeJSON(outputPath, vercelConfig, { spaces: 2 });

      console.log(
        "✅ vercel.json created with /blogs → /posts.html redirects."
      );
    } catch (err) {
      console.error("❌ Failed to create vercel.json:", err);
    }
  },
];
```

#### `websiteDescription` _(required)_

A brief description of your website.

---

#### `productionURL` _(required)_

The live URL of your website (e.g., `https://example.com`).

---

#### `developmentURL` _(required)_

The local URL for development.

---

#### `metaTitleTemplate` _(optional)_

A template for page titles, used in meta tags.

- **Example**: `"%title - %siteName"` will format titles as _"Page Title - Example Website"_.
- **Default**: `"%title"` (only the page title is displayed).

---

#### `themeColor` _(optional)_

Sets the theme color for mobile devices (e.g., browser tab color).

---

# Integrations

Easily connect your website to third-party analytics, tracking, and marketing tools using the **integrations** section
in your configuration file. Below are the supported integrations and their setup instructions:

**Note:** we recommend you to set up using Google Tag Master.

## Google Analytics

Track user behavior, traffic sources, and website performance.

- **Field**: `googleAnalytics`
- **Setup**: Add your Tracking ID (e.g., `UA-XXXXXX-X`).

---

## Bing Webmaster Tools

Verify your site with Bing's search engine.

- **Field**: `bingWebmasters`
- **Setup**: Add the Bing verification key.

---

## Google Search Console

Monitor and optimize your website’s presence in Google search results.

- **Field**: `googleWebmasters`
- **Setup**: Add the Google Search Console verification key.

---

## Hotjar

Gain insights into user interactions using heatmaps, session recordings, and surveys.

- **Field**: `hotjarAnalytics`
- **Setup**: Enter your Hotjar ID.

---

## Google Tag Manager

Manage and deploy marketing tags (e.g., analytics, conversion tracking) from a single platform.

- **Field**: `googleTagManager`
- **Setup**: Add your container ID (e.g., `GTM-XXXX`).

---

## Facebook Pixel

Optimize ad campaigns, track conversions, and build retargeting audiences.

- **Field**: `facebookPixel`
- **Setup**: Add your Facebook Pixel ID.

---

## Microsoft Clarity

Get in-depth user session analytics and behavior insights.

- **Field**: `microsoftClarity`
- **Setup**: Add the Microsoft Clarity tracking ID.

For each integration, simply replace the placeholder with your actual service IDs.

## PWA Configurations

- **enabled**: If you do not wish to create a Progressive Web App, set enabled to false.
- **short_name**: This will be displayed on mobile home screens when users install the PWA.
- **htmlFiles**: Only include HTML files that are crucial for the PWA (e.g., index.html). You can leave this array empty
  if needed.
- **start_url**: This URL is the page that will open when the app starts on a mobile device or desktop. Typically, this
  would be your homepage, e.g., /index.html.
- **Display** Mode: Set the display mode to standalone, fullscreen, or minimal-ui, depending on how you want the PWA to
  behave when launched.

## Next Step: Setup Folder Structure

Now that you've set up your configuration file, the next step is
to [set up the folder structure](./folder-structure-setup.md).
