import ArticleBlogpostCommon = require("./articleBlogpostCommon");

interface BlogPostOptions extends ArticleBlogpostCommon {
  /**
   * Type of content, which should always be "blogpost" for BlogPost.
   */
  type?: "blogpost";

  /**
   * The genre or category of the blog post.
   * Example: 'Programming', 'Lifestyle'
   */
  genre?: string;

  /**
   * The main body of the blog post.
   * Example: 'This post will guide you through building a React app...'
   */
  articleBody?: string;

  /**
   * An alternative headline or title for the blog post.
   * Example: 'React App Building Guide'
   */
  alternativeHeadline?: string;
}

export = BlogPostOptions;
