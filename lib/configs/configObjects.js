const Joi = require("joi");

const contactSchema = Joi.object({
  "@context": Joi.string()
    .valid("https://schema.org")
    .default("https://schema.org"),
  "@type": Joi.string().valid("ContactPoint").default("ContactPoint"),
  telephone: Joi.string().required(),
  contactType: Joi.string().required(),
  availableLanguage: Joi.array().items(Joi.string()).required(),
  areaServed: Joi.array().items(Joi.string()).required(),
});

const addressSchema = Joi.object({
  "@context": Joi.string()
    .valid("https://schema.org")
    .default("https://schema.org"),
  "@type": Joi.string().valid("PostalAddress").default("PostalAddress"),
  addressLocality: Joi.string().optional(),
  postalCode: Joi.string().optional(),
  streetAddress: Joi.string().optional(),
  addressRegion: Joi.string().optional(),
});

const personSchema = Joi.object({
  "@context": Joi.string()
    .valid("https://schema.org")
    .default("https://schema.org"),
  "@type": Joi.string().valid("Person").default("Person"),

  address: addressSchema.optional(),
  email: Joi.string().email().optional(),
  gender: Joi.string().valid("Male", "Female", "Nonbinary", "Other").optional(),
  jobTitle: Joi.string().optional(),
  name: Joi.string().optional(),
  telephone: Joi.string().optional(),
  birthDate: Joi.string().isoDate().optional(),
  nationality: Joi.string().optional(),
  url: Joi.string().uri().optional().messages({
    "string.uri": "The URL must be a valid web address.",
  }),
  children: Joi.array().items(Joi.link("#personSchema")).optional(),
}).id("personSchema");

const organizationSchema = Joi.object({
  "@context": Joi.string()
    .valid("https://schema.org")
    .default("https://schema.org"),
  "@type": Joi.string().valid("Organization").default("Organization"),

  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  url: Joi.string().uri().optional(),
  logo: Joi.string().uri().optional(),
  sameAs: Joi.array().default([]).items(Joi.string().uri()).optional(),
  foundingDate: Joi.string().isoDate().optional(),
  foundingLocation: Joi.string().optional(),
  address: addressSchema.optional(),
  contactPoint: Joi.array().default([]).items(contactSchema).optional(),
  alumni: Joi.array().default([]).items(personSchema).optional(),
});

const websiteSchema = Joi.object({
  "@context": Joi.string()
    .valid("https://schema.org")
    .default("https://schema.org"),
  "@type": Joi.string().valid("WebSite").default("WebSite"),
  url: Joi.string().uri().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = {
  contactSchema,
  addressSchema,
  organizationSchema,
  personSchema,
  websiteSchema,
};
