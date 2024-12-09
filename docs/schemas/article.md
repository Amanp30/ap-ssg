## Article Schema

The **Article Schema** is used for structured data to represent long-form content, such as blog posts, news articles, or tutorials. This schema helps search engines understand the content better and display rich snippets in search results.

### Example Configuration

Here’s an example of a `pageConfig` object with the Article Schema:

```javascript
const pageConfig = {
  // other configuration fields
  type: "article", // Specify the type as "article"
  author: {
    name: "Aman Pareek", // Author's name
    url: "https://amanpareek.in" // Author's profile or website URL
  },
  articleBody:
    "This is the body of the article. It contains the full content of the article.", // Full content of the article
  genre: "Tech", // Genre or category of the article
  keywords: "software, article, example", // Keywords for SEO
  wordCount: 1200, // Total word count of the article
  rating: 4.5, // Average user rating
  reviewCount: 150, // Number of reviews or ratings
  articleSection: "Introduction" // Section of the article, e.g., Introduction, Methods, Conclusion
};
```
