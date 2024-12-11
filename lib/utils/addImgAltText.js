const addImageAltTextAndTitle = function (html) {
  const regexPattern = /<img([^>]+)>/g;

  return html.replace(regexPattern, (match, attributes) => {
    const altMatch = attributes.match(/\balt\s*=\s*["']([^"']*)["']/);
    const titleMatch = attributes.match(/\btitle\s*=\s*["']([^"']*)["']/);

    const srcMatch = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/);
    if (!srcMatch) return match;

    const filename = srcMatch[1].split("/").pop();
    const altText = filename
      .replace(/\.[a-zA-Z]+$/, "")
      .replace(/[_-]+/g, " ")
      .trim();
    const titleText = altText;

    if (altMatch) {
      if (altMatch[1] === "") {
        attributes = attributes.replace(altMatch[0], `alt="${altText}"`);
      }
    } else {
      attributes += ` alt="${altText}"`;
    }

    if (titleMatch) {
      if (titleMatch[1] === "") {
        attributes = attributes.replace(titleMatch[0], `title="${titleText}"`);
      }
    } else {
      attributes += ` title="${titleText}"`;
    }

    return `<img${attributes}>`;
  });
};

module.exports = addImageAltTextAndTitle;
