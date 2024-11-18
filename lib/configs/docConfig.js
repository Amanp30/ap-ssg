const Joi = require("joi");
const userConfig = require("./userConfig");
const ensureValidHtmlPath = require("../utils/ensureValidHtmlPath");
const formatMetaTitle = require("../utils/formatMetaTitle");

const documentConfigSchema = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().required(),

  metaTitleTemplate: Joi.string().default(""),

  shouldFollowLinks: Joi.boolean().default(true),

  shouldAllowIndexing: Joi.boolean().default(true),

  keywords: Joi.string().optional(),

  path: Joi.string().required(),

  twitterHandle: Joi.string()
    .optional()
    .default("")
    .regex(/^@?(\w+)$/) // Ensures valid Twitter handle characters
    .custom((value) => (value.startsWith("@") ? value : "@" + value)),

  ogImage: Joi.string()
    .optional()
    .default("/assets/site/ogImage.png")
    .custom((value, helpers) => {
      const { path, title } = helpers.state.ancestors[0]; // Access 'path' and 'title' from the context

      // Ensure the value is either an absolute URL or a relative path
      if (value && !/^https?:\/\//i.test(value) && !/^\//.test(value)) {
        return helpers.message(
          `ogImage must be a valid URL or a relative path for "${title}" path => "${path}".`,
        );
      }

      // Validate that the file extension is a valid image extension
      const validImageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
      if (value && !validImageExtensions.test(value)) {
        return helpers.message(
          `ogImage must have a valid image extension (e.g., .jpg, .png, .gif, .webp)  for "${title}" path => "${path}".`,
        );
      }

      return value;
    }),

  author: Joi.string(),

  createdAt: Joi.string().isoDate().optional(),

  updatedAt: Joi.string().isoDate().required(),

  changefreq: Joi.string().valid(
    "always",
    "hourly",
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "never",
  ),

  priority: Joi.number().default(1).min(0).max(1),

  pageLanguage: Joi.string(),
});

/**
 * Validates the document passed before generating the HTML file and applies the default configurations
 * provided from the `apssg` config file. This function checks and ensures that the document adheres
 * to the required structure and modifies or adds default settings as needed from the configuration file.
 *
 * @param config
 * @returns {any}
 */
const validateDocumentConfig = (config) => {
  const { error, value: doc } = documentConfigSchema.validate(config);

  if (error) {
    throw new Error(error.details[0].message);
    process.exit(1);
  }

  const websiteUrl = userConfig.websiteUrl;

  doc.googleAnalytics = userConfig.googleAnalytics;

  doc.bingAnalytics = userConfig.bingAnalytics;

  const fullUrl = new URL(ensureValidHtmlPath(doc.path), websiteUrl).href;

  doc.filePath = doc.path;

  doc.ogImage = new URL(doc.ogImage, websiteUrl).href;

  doc.url = fullUrl;

  doc.websiteUrl = websiteUrl;

  const metaTitleTemplate = doc.metaTitleTemplate
    ? doc.metaTitleTemplate
    : userConfig.metaTitleTemplate;

  doc.themeColor = userConfig.themeColor;

  doc.title = formatMetaTitle(
    doc.title,
    metaTitleTemplate,
    userConfig.websiteName,
  );

  doc.integrations = userConfig.integrations;

  doc.pageLanguage = doc.pageLanguage
    ? doc.pageLanguage
    : userConfig.websiteLang;

  return doc;
};

module.exports = validateDocumentConfig;
