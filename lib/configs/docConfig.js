const Joi = require("joi");
const userConfig = require("./userConfig");
const ensureValidHtmlPath = require("../utils/ensureValidHtmlPath");
const formatMetaTitle = require("../utils/formatMetaTitle");
const { websiteName, websiteDescription } = require("../../apssg.config");
const { personSchema, organizationSchema } = require("./configObjects");

const documentConfigSchema = Joi.object({
  // Required fields for every page or document
  title: Joi.string().required(),
  description: Joi.string().required(),
  path: Joi.string().required(),
  createdAt: Joi.string().isoDate().required(),
  updatedAt: Joi.string().isoDate().required(),

  // optional fields for document
  type: Joi.string().default("").valid("blogpost", "software", "article"),
  pageLanguage: Joi.string()
    .pattern(/^[a-z]{2}(-[A-Z]{2})?$/, "language code") // ISO 639-1 or BCP 47
    .default(userConfig.websiteLang || "en") // Default to the website language or English
    .messages({
      "string.pattern.base":
        "Language must be a valid ISO 639-1 code (e.g., 'en', 'fr') or a BCP 47 language tag (e.g., 'en-US').",
    }),
  isAccessibleForFree: Joi.boolean().default(true),
  metaTitleTemplate: Joi.string().default(""),
  shouldFollowLinks: Joi.boolean().default(true),
  shouldAllowIndexing: Joi.boolean().default(true),
  sponsor: Joi.alternatives().try(personSchema, organizationSchema).optional(),
  publishedAt: Joi.string().isoDate().optional(),
  alternativeHeadline: Joi.string().optional(),
  articleSection: Joi.string().optional(),
  articleBody: Joi.string().optional(),
  author: personSchema.optional(),
  editor: personSchema.optional(),
  priority: Joi.number().default(1).min(0).max(1),
  changefreq: Joi.string()
    .valid("always", "hourly", "daily", "weekly", "monthly", "yearly", "never")
    .optional(),
  twitterHandle: Joi.string()
    .optional()
    .default("")
    .regex(/^@?(\w+)$/)
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

  keywords: Joi.string()
    .pattern(/^[a-zA-Z\s,]+$/)
    .messages({
      "string.pattern.base":
        "Keywords must be a comma-separated list of words.",
    })
    .optional(),

  wordCount: Joi.number()
    .integer()
    .min(1)
    .messages({
      "number.base": "Word count must be a number.",
      "number.min": "Word count must be at least 1.",
    })
    .optional(),

  genre: Joi.string()
    .pattern(/^[a-zA-Z\s,]+$/)
    .messages({
      "string.pattern.base": "Genre must be a comma-separated list of words.",
    }),

  // Aggregate Rating schema
  rating: Joi.number().min(1).max(5).precision(1).optional().messages({
    "number.base": `"rating" should be a number`,
    "number.min": `"rating" should be between 1 and 5`,
    "number.max": `"rating" should be between 1 and 5`,
  }),

  reviewCount: Joi.number().integer().min(0).optional().messages({
    "number.base": `"reviewCount" should be an integer`,
    "number.min": `"reviewCount" should be at least 0`,
  }),

  // BreadCrumbList Schema1
  breadCrumbList: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        item: Joi.string()
          .required()
          .custom((value, helpers) => {
            if (!value.startsWith("http://") && !value.startsWith("https://")) {
              return new URL(value, userConfig.websiteUrl).href;
            }
            return value; // Return as is for absolute URLs
          }, "Prepend domain to relative URLs"),
      }),
    )
    .optional(),

  // Software Application Schema fields
  softwareLicense: Joi.string()
    .valid(
      "MIT",
      "Apache-2.0",
      "GPL-3.0",
      "BSD-3-Clause",
      "CC-BY-4.0",
      "Proprietary",
    )
    .messages({
      "any.only":
        "License name must be one of the following: MIT, " +
        "Apache-2.0, GPL-3.0, BSD-3-Clause, CC-BY-4.0, or Proprietary.",
    })
    .optional(),

  softwareVersion: Joi.string()
    .pattern(/^(\d+\.)?(\d+\.)?(\*|\d+)$/, "software version")
    .optional()
    .messages({
      "string.pattern.base":
        "softwareVersion must follow the Semantic Versioning format (e.g., 1.0.0).",
    }),

  softwarePlatform: Joi.string()
    .valid("Web", "Mobile", "Desktop", "Server", "IoT", "Other")
    .optional()
    .messages({
      "any.only":
        "softwarePlatform must be one of: Web, Mobile, Desktop, Server, IoT, Other.",
      "any.required": "platform is a required field.",
    }),

  softwareOperatingSystem: Joi.string()
    .valid("Windows", "macOS", "Linux", "Android", "iOS", "All", "Other")
    .optional()
    .messages({
      "any.only":
        "softwareOperatingSystem must be one of: Windows, macOS, Linux, Android, iOS, All, Other.",
    }),

  softwareRepository: Joi.object({
    url: Joi.string().uri().required().messages({
      "string.uri": "softwareRepository.url must be a valid URI.",
      "any.required": "softwareRepository.url is a required field.",
    }),
    branch: Joi.string()
      .regex(/^[\w.-]+$/) // Allows typical branch name characters like alphanumerics, dashes, underscores, and dots
      .optional()
      .messages({
        "string.pattern.base":
          "softwareRepository.branch must be a valid branch name.",
      }),
  }),
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

  const fullUrl = new URL(ensureValidHtmlPath(doc.path), websiteUrl).href;

  doc.filePath = doc.path;

  doc.ogImage = new URL(doc.ogImage, websiteUrl).href;

  doc.url = fullUrl;

  doc.websiteUrl = websiteUrl;

  doc.websiteName = websiteName;

  doc.websiteDescription = websiteDescription;

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

  doc.pwa = userConfig.pwa;

  doc.organization = userConfig.organization;

  doc.datePublished = doc.publishedAt;

  doc.pageLanguage = doc.pageLanguage
    ? doc.pageLanguage
    : userConfig.websiteLang;

  doc.inLanguage = doc.pageLanguage;

  return doc;
};

module.exports = validateDocumentConfig;
