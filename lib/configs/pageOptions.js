const Joi = require("joi");

const stringWithMessage = (field) =>
  Joi.string()
    .custom((value, helpers) => {
      if (typeof value !== "string") {
        return helpers.error("string.base");
      }
      return value;
    }, field)
    .messages({
      "string.base": `Each item in '${field}' must be a valid string.`,
    });

const pageOptionsSchema = Joi.object({
  insertHead: Joi.array().items(stringWithMessage("insertHead")).optional(),
  insertBodyEnd: Joi.array()
    .items(stringWithMessage("insertBodyEnd"))
    .optional(),
})
  .optional()
  .unknown(false);

/**
 * Validates the page options.
 * @param {Object} options - The options to validate.
 * @returns {Object} - The validated options.
 * @throws {Error} - Throws an error if validation fails.
 */
function validatePageOptions(options) {
  const { error, value } = pageOptionsSchema.validate(options);

  if (error) {
    throw new Error(`[ap-ssg] Invalid page options: ${error.message}`);
  }

  return value;
}

module.exports = validatePageOptions;
