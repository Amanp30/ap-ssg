const addImageAltTextAndTitle = function (html) {
  const regexPattern = /<img([^>]+?)(src="([^"]+)")[^>]*>/g;

  return html.replace(regexPattern, (match, beforeSrc, src, url) => {
    const altMatch = beforeSrc.match(/\balt\s*=\s*["']([^"']*)["']/);
    const titleMatch = beforeSrc.match(/\btitle\s*=\s*["']([^"']*)["']/);

    const filename = url.split("/").pop();
    const altText = filename
      .replace(/\.[a-zA-Z]+$/, "")
      .replace(/[_-]+/g, " ")
      .trim();
    const titleText = altText;

    if (altMatch) {
      if (altMatch[1] === "") {
        return match.replace(altMatch[0], `alt="${altText}"`);
      }
      return match;
    }

    if (titleMatch) {
      if (titleMatch[1] === "") {
        return match.replace(titleMatch[0], `title="${titleText}"`);
      }
      return match;
    }

    return `<img${beforeSrc} alt="${altText}" title="${titleText}" ${src}>`;
  });
};

module.exports = addImageAltTextAndTitle;

const html = '<img src="/assets/magic-pin.png" />';
console.log(addImageAltTextAndTitle(html));
