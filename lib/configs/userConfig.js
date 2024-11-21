const Joi = require("joi");

const configSchema = Joi.object({
  websiteLang: Joi.string().default("en-US"),

  mode: Joi.string().valid("production", "development").required(),

  websiteName: Joi.string().min(3).max(100).required(),

  productionURL: Joi.string().uri().required(),

  developmentURL: Joi.string().uri().required(),

  metaTitleTemplate: Joi.string().default("%title"),

  themeColor: Joi.string()
    .pattern(/^#([0-9A-Fa-f]{3}){1,2}$/i) // Hex format
    .default("black"),

  integrations: Joi.object({
    googleAnalytics: Joi.string().default(""),
    bingWebmasters: Joi.string().default(""),
    googleWebmasters: Joi.string().default(""),
    hotjarAnalytics: Joi.string().default(""),
    googleTagManager: Joi.string().default(""),
    facebookPixel: Joi.string().default(""),
    microsoftClarity: Joi.string().default(""),
  }).optional(),

  pwa: Joi.object({
    enabled: Joi.boolean().default(true),
    short_name: Joi.string().required(),
    description: Joi.string().default("").optional(),
    htmlFiles: Joi.array().items(Joi.string().required()).required(),
    start_url: Joi.string().required(),
    display: Joi.string()
      .valid("standalone", "fullscreen", "minimal-ui", "browser")
      .default("standalone"),
    background_color: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .default("#ffffff"),
    theme_color: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .default("#3d0665"),
    orientation: Joi.string()
      .valid("any", "natural", "landscape", "portrait")
      .default("portrait"),
  }).required(),
});

/**
 * Validate user apssg.config.js file
 * @param config
 * @returns {any}
 */
const getValidUserConfig = (config) => {
  const { error, value } = configSchema.validate(config);

  if (error) {
    throw new Error(error.details[0].message);
  }

  // Corrected variable names
  value.isProduction = value.mode === "production";
  value.isDevelopment = value.mode === "development";

  value.pwa.name = value.websiteName;
  value.pwa.lang = value.websiteLang;

  value.websiteUrl = value.isProduction
    ? value.productionURL
    : value.developmentURL;

  return value;
};

// Assuming the configuration file is correctly located
const apConfigData = require(`${process.cwd()}/apssg.config.js`);

const userConfig = getValidUserConfig(apConfigData);

module.exports = userConfig;
