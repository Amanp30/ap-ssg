/**
 * Enhances all <img> tags in the given HTML string by ensuring they have valid `alt` and `title` attributes.
 * - If the `alt` or `title` attribute is missing, it is added based on the filename in the `src` attribute.
 * - If the `alt` or `title` attribute exists but is empty, it is updated based on the filename in the `src` attribute.
 * - Replaces self-closing `<img ... />` tags with `<img ...>` for consistency.
 *
 * @param {string} html - The HTML string containing <img> tags to process.
 * @returns {string} - The updated HTML string with improved <img> tags.
 *
 * @example
 * // Example 1: Basic image tag with no `alt` or `title` attributes
 * const input1 = `<img src="hello.png" width="4545" />`;
 * const output1 = addImageAltTextAndTitle(input1);
 * console.log(output1);
 * // Output: '<img src="hello.png" width="4545" alt="hello" title="hello">'
 *
 * @example
 * // Example 2: Image tag with an existing `title` but no `alt`
 * const input2 = `<img src="test-image.png" title="existing title"/>`;
 * const output2 = addImageAltTextAndTitle(input2);
 * console.log(output2);
 * // Output: '<img src="test-image.png" title="existing title" alt="test image">'
 *
 * @example
 * // Example 3: Image tag with an empty `alt` and no `title`
 * const input3 = `<img src="example-photo.jpg" alt=""/>`;
 * const output3 = addImageAltTextAndTitle(input3);
 * console.log(output3);
 * // Output: '<img src="example-photo.jpg" alt="example photo" title="example photo">'
 *
 * @example
 * // Example 4: Image tag with both `alt` and `title` already set
 * const input4 = `<img src="graphic.png" alt="custom alt" title="custom title"/>`;
 * const output4 = addImageAltTextAndTitle(input4);
 * console.log(output4);
 * // Output: '<img src="graphic.png" alt="custom alt" title="custom title">'
 */
const addImageAltTextAndTitle = function (html) {
  // Regex to match <img> tags with or without closing slash
  const regexPattern = /<img([^>]+)(\/?)>/g;

  return html.replace(regexPattern, (match, attributes, closingSlash) => {
    const srcMatch = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/);
    if (!srcMatch) return match; // If there's no src attribute, leave the tag unchanged

    const altMatch = attributes.match(/\balt\s*=\s*["']([^"']*)["']/);
    const titleMatch = attributes.match(/\btitle\s*=\s*["']([^"']*)["']/);

    // Derive alt and title text from the filename
    const filename = srcMatch[1].split("/").pop();
    const altText = filename
      .replace(/\.[a-zA-Z]+$/, "") // Remove file extension
      .replace(/[_-]+/g, " ") // Replace underscores or hyphens with spaces
      .trim();
    const titleText = altText;

    let updatedAttributes = attributes.replace(/\s*\/$/, ""); // Remove any trailing /

    // Add or update the alt attribute
    if (altMatch) {
      if (altMatch[1] === "") {
        updatedAttributes = updatedAttributes.replace(
          altMatch[0],
          `alt="${altText}"`,
        );
      }
    } else {
      updatedAttributes += ` alt="${altText}"`;
    }

    // Add or update the title attribute
    if (titleMatch) {
      if (titleMatch[1] === "") {
        updatedAttributes = updatedAttributes.replace(
          titleMatch[0],
          `title="${titleText}"`,
        );
      }
    } else {
      updatedAttributes += ` title="${titleText}"`;
    }

    // Ensure the tag ends with >
    return `<img ${updatedAttributes.trim()}>`;
  });
};

module.exports = addImageAltTextAndTitle;
