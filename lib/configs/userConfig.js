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
  }),
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

  value.websiteUrl = value.isProduction
    ? value.productionURL
    : value.developmentURL;

  return value;
};

// Assuming the configuration file is correctly located
const apConfigData = require(`${process.cwd()}/apssg.config.js`);

const userConfig = getValidUserConfig(apConfigData);

module.exports = userConfig;
