const configObj = {
  mode: "development",
  websiteName: "Example Website",
  websiteDescription: "Example website description",
  productionURL: "https://example.com",
  developmentURL: "http://localhost:63342/ap-ssg/build",
  metaTitleTemplate: "%title - %siteName", // default is %title
  themeColor: "#3d0665", // default is black
  websiteLang: "en-us", // default is en-US
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

module.exports = JSON.stringify(configObj, null, 2);
