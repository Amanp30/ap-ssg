const jsonMinify = require("jsonminify");
const { websiteSchema, personSchema } = require("../configs/configObjects");

class JsonldSchemas {
  /**
   * @param {Object} doc - The document containing metadata for the schema.
   */
  constructor(doc) {
    this.doc = doc;
  }

  /**
   * Wraps a schema object in a <script> tag with JSON-LD format.
   * @param {Object} schemaObject - The schema object to wrap.
   * @returns {string} - The schema wrapped in a <script> tag.
   */
  wrapSchema(schemaObject) {
    if (schemaObject === undefined) return "";
    const stringify = JSON.stringify(schemaObject);
    const minifiedSchema = jsonMinify(stringify);
    return `<script type="application/ld+json">${minifiedSchema}</script>`;
  }

  /**
   * Return AggregateRating object if rating and reviewCount provided else empty object
   * @param rating
   * @param reviewCount
   * @returns {{}|{aggregateRating: {reviewCount, "@type": string, ratingValue}}}
   */
  #getAggregateRating(rating, reviewCount) {
    if (rating && reviewCount) {
      return {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating, // e.g., 4.5
          reviewCount: reviewCount, // e.g., 150
        },
      };
    }
    return {};
  }

  /**
   * Return Organization schema if provided
   * @returns {string}
   */
  getOrganizationSchema() {
    const { organization } = this.doc;
    if (!organization) return "";
    return this.wrapSchema(organization);
  }

  getSoftwareSchema() {
    const { type } = this.doc;
    if (type !== "software") return "";

    const softwareRepoObjects = this.doc.softwareRepository
      ? [
          {
            "@type": "PropertyValue",
            name: "repositoryUrl",
            value: this.doc.softwareRepository.url,
          },
          {
            "@type": "PropertyValue",
            name: "repositoryBranch",
            value: this.doc.softwareRepository.branch,
          },
        ]
      : [];

    const softwarePlatformObj = this.doc.softwarePlatform
      ? [
          {
            "@type": "PropertyValue",
            name: "platform",
            value: this.doc.softwarePlatform,
          },
        ]
      : [];

    const schemaJson = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: this.doc.title,
      description: this.doc.description,
      url: this.doc.url,
      version: this.doc.softwareVersion,
      author: this.doc.author,
      license: this.doc.softwareLicense,
      keywords: this.doc.keywords,
      operatingSystem: this.doc.softwareOperatingSystem,
      additionalProperty: [...softwarePlatformObj, ...softwareRepoObjects],
    };

    return this.wrapSchema(schemaJson);
  }

  getBreadCrumbs() {
    const { breadCrumbList } = this.doc;
    if (!Array.isArray(breadCrumbList) || breadCrumbList.length === 0)
      return "";

    const schemaJson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      additionalType: "https://schema.org/ItemList",
      itemListElement: breadCrumbList.map((bc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: bc.name,
        item: bc.item,
      })),
    };

    return this.wrapSchema(schemaJson);
  }

  getWebsiteSchema() {
    const { value: validWebsiteSchema, error } = websiteSchema.validate({
      url: this.doc.websiteUrl,
      name: this.doc.websiteName,
      description: this.doc.websiteDescription,
    });

    if (error) {
      console.error("Invalid website schema:", error);
      return ""; // Or return a fallback schema
    }

    return this.wrapSchema(validWebsiteSchema);
  }

  /**
   * Generates a Blog schema in JSON-LD format.
   * @returns {string} - The JSON-LD schema for a blog or an empty string if the type is not "blog".
   */
  getBlogSchema() {
    const {
      type,
      title,
      description,
      datePublished,
      dateCreated,
      dateModified,
      author,
      imageUrl,
      url,
      genre,
      keywords,
      wordCount,
      rating,
      reviewCount,
      articleSection,
      editor,
      inLanguage,
      isAccessibleForFree,
    } = this.doc;

    if (!["article", "blogpost"].includes(type)) return "";

    const isBlogPost = type === "blogpost";
    const isArticle = type === "article";
    const schemaType = isBlogPost ? "BlogPosting" : "Article";

    const schemaJson = {
      "@context": "https://schema.org",
      "@type": schemaType,
      headline: title,
      description,
      datePublished,
      dateModified,
      dateCreated,
      author,
      wordCount,
      url,
      isAccessibleForFree,
      inLanguage,
      image: imageUrl || undefined,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      ...this.#getAggregateRating(rating, reviewCount),
    };

    if (isArticle) {
      schemaJson.section = articleSection;
      schemaJson.editor = editor;
    }

    if (isBlogPost) {
      schemaJson.genre = genre;
      schemaJson.keywords = keywords;
      schemaJson.articleBody = this.doc.articleBody || "";
      schemaJson.alternativeHeadline = this.doc.alternativeHeadline || "";
    }

    return this.wrapSchema(schemaJson);
  }
}

module.exports = JsonldSchemas;
