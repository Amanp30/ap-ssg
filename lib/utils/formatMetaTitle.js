/**
 * Formats a meta title string for use in a page's <head> tag.
 *
 * @param {string} title - The title of the current page.
 * @param {string} [format="%title"] - The format string, using placeholders:
 *   - `%title` will be replaced with the page title.
 *   - `%siteName` will be replaced with the website's name.
 * @param {string} siteName - The default website name.
 * @returns {string} - The formatted meta title string.
 *
 * @example
 * formatMetaTitle("About Us", "%title | %siteName", "MyWebsite");
 * // Returns: "About Us | MyWebsite"
 *
 * @example
 * formatMetaTitle("Contact", "%title - %siteName");
 * // Returns: "Contact - Website Name"
 */
function formatMetaTitle(title = "", format = "%title", siteName = "") {
  const formattedTitle = format
    .replace(/%title/, title)
    .replace(/%siteName/, siteName);
  return formattedTitle.trim();
}

module.exports = formatMetaTitle;
