const escape = require("escape-html");

/**
 * Return escaped html extracting pre code tags
 * @param {string} html
 * @returns {string}
 */
exports.escapePreCode = function (html) {
  const regexPattern =
    /<pre(?: ([\s\S]*?))?><code(?: ([\s\S]*?))?>([\s\S]*?)<\/code><\/pre>/g;

  return html.replace(
    regexPattern,
    (match, preAttributes = "", codeAttributes = "", codeContent) => {
      const escapedCodeContent = escape(codeContent);
      return `<pre ${preAttributes}><code ${codeAttributes}>${escapedCodeContent}</code></pre>`;
    },
  );
};
