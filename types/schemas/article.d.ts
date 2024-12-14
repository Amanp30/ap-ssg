import { ArticleBlogpostCommon } from "./articleBlogpostCommon";
import { PersonObject } from "./person";

interface ArticleOptions extends ArticleBlogpostCommon {
  /**
   * Type of content, which should always be "article" for Article.
   */
  type?: "article";

  /**
   * The section or category of the article.
   * Example: 'Technology', 'Health'
   */
  articleSection?: string;

  /**
   * Optional: The number of reviews or ratings for the article.
   * Example: 120
   */
  reviewCount?: number;

  /**
   * The editor or responsible person for editing the article.
   */
  editor?: PersonObject;
}

export { ArticleOptions };
