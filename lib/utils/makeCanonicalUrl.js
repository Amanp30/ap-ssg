function makeCanonicalUrl(inputUrl) {
  try {
    const url = new URL(inputUrl);
    let pathname = url.pathname;

    // Remove /index.html (case-insensitive)
    pathname = pathname.replace(/\/index\.html$/i, "");

    // Remove trailing slash if not root
    if (pathname !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    // Return canonicalized full URL
    return `${url.origin}${pathname}`;
  } catch (e) {
    throw new Error("Invalid URL provided");
  }
}

module.exports = makeCanonicalUrl;
