import PersonObject = require("./person");

/**
 * Base interface for common properties between Article and BlogPost
 */
interface ArticleBlogpostCommon {
  /**
   * Keywords for article or blogpost
   */
  keywords?: string;

  /**
   * The author or creator of the article or blog post.
   * Example: 'Jane Doe'
   */
  author?: PersonObject;

  /**
   * The word count of the article or blog post.
   * Example: 1200
   */
  wordCount?: number;

  /**
   * Optional: The average rating of the article or blog post.
   * This can be a number between 1 and 5.
   * Example: 4.5
   */
  rating?: number;

  /**
   * Indicates whether the article or blog post is accessible for free.
   * Example: true (The article is free to read)
   */
  isAccessibleForFree?: boolean;
}

export = ArticleBlogpostCommon;
