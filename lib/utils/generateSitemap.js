const SiteMapGenerator = require("ap-sitemap");
const userConfig = require("../configs/userConfig");

/**
 * This function generates a sitemap using the `SiteMapGenerator` class and returns the generated sitemap link.
 * @param {Array} sitemapData - The data for the sitemap.
 * @returns {Promise<string>} - The generated sitemap link.
 * @example
 * const sitemapData = [
 * {
    url: 'https://example.com/page1',
    updatedAt: '2024-11-04T10:00:00Z',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    url: 'https://example.com/page2',
    updatedAt: '2024-11-03T10:00:00Z',
    changefreq: 'weekly',
    priority: 0.8,
  },
 * ];
 * const sitemapLink = await generateSitemap(sitemapData);
 */
async function generateSitemap(sitemapData) {
  try {
    const sitemap = new SiteMapGenerator({
      baseUrl: userConfig.websiteUrl,
      outDir: userConfig.outDir,
      removeIndexExtension: true,
    });

    sitemap.addPages(sitemapData);

    const { sitemapLink } = sitemap.generate();

    return sitemapLink;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    throw new Error("Sitemap generation failed.");
  }
}

module.exports = generateSitemap;
