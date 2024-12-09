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
  "mode": "development",
  "websiteName": "Example Website",
  "websiteDescription": "Example website description",
  "productionURL": "https://example.com",
  "developmentURL": "http://localhost:63342/ap-ssg/build",
  "metaTitleTemplate": "%title - %siteName",
  "themeColor": "#3d0665",
  "websiteLang": "en-us",
  "organization": {},
  "integrations": {
    "googleAnalytics": "",
    "bingWebmasters": "",
    "googleWebmasters": "",
    "hotjarAnalytics": "",
    "googleTagManager": "",
    "facebookPixel": "",
    "microsoftClarity": ""
  },
  "pwa": {
    "enabled": true,
    "description": "Your pwa description",
    "short_name": "Example",
    "htmlFiles": [
      "index.html"
    ],
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#3d0665",
    "orientation": "portrait"
  }
};
```

## Configuration Fields Explained

### General Settings

#### `mode`

Defines the environment. Acceptable values are `production` or `development`.

- **`production`**: Uses the `productionURL`.
- **`development`**: Uses the `developmentURL`.

---

#### `websiteName` *(required)*

The name of your website.

---

#### `websiteDescription` *(required)*

A brief description of your website.

---

#### `productionURL` *(required)*

The live URL of your website (e.g., `https://example.com`).

---

#### `developmentURL` *(required)*

The local URL for development.

---

#### `metaTitleTemplate` *(optional)*

A template for page titles, used in meta tags.

- **Example**: `"%title - %siteName"` will format titles as *"Page Title - Example Website"*.
- **Default**: `"%title"` (only the page title is displayed).

---

#### `themeColor` *(optional)*

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

* **enabled**: If you do not wish to create a Progressive Web App, set enabled to false.
* **short_name**: This will be displayed on mobile home screens when users install the PWA.
* **htmlFiles**: Only include HTML files that are crucial for the PWA (e.g., index.html). You can leave this array empty
  if needed.
* **start_url**: This URL is the page that will open when the app starts on a mobile device or desktop. Typically, this
  would be your homepage, e.g., /index.html.
* **Display** Mode: Set the display mode to standalone, fullscreen, or minimal-ui, depending on how you want the PWA to
  behave when launched.

## Next Step: Setup Folder Structure

Now that you've set up your configuration file, the next step is
to [set up the folder structure](./folder-structure-setup.md).





