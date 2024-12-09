## BlogPosting Schema

The **BlogPosting Schema** is designed specifically for blog posts to enhance search engine understanding and
visibility. This schema allows your blog content to be indexed more effectively and appear with rich snippets in search
results.

### Example Configuration

Below is an example configuration for a `pageConfig` object using the **BlogPosting Schema**:

```javascript
const pageConfig = {
  // other configuration fields
  type: "blogpost", // Specify the type as "blogpost"
  keywords: "about, us, blog, company", // Keywords for SEO
  genre: "Business", // Genre or category of the blog post
  wordCount: 500, // Total word count of the blog post
  articleBody:
    "This is the body of the blog post. It contains the content that explains who we are and what we do." // Full content of the blog post
};
