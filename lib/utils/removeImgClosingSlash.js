const regexPattern = /<img([^>]+)\/>/g;

function removeImgClosingSlash(text) {
  return text.replace(regexPattern, (match, p1) => {
    // console.log({ match, p1 });
    // Replace the trailing "/>" with ">"
    return `<img${p1}>`;
  });
}

module.exports = removeImgClosingSlash;
