## How to create pages?

Before you begin, ensure that you’ve completed the following steps:

- Successfully [installed the package](./installation.md).
- [Set up the configuration file](./setup-config.md) and [folder structure](./folder-structure-setup.md) as per the
  documentation.
- Familiarized yourself with the basic concepts of the package.

Inside your project, you’ll find a `src` folder. Within `src`, there is a `pages` folder (i.e., `src/pages`). In this
folder, you can create JavaScript files with any name you choose. It is recommended to use descriptive filenames for
clarity and ease of use.

### Example Usage

```javascript
const { ssg } = require("ap-ssg");

const pageConfig = {
  title: "Page Title",
  description: "Page Description",
  updatedAt: "2024-11-04T10:00:00Z",
  createdAt: "2024-11-04T10:00:00Z",
  path: "/page-path"
};

const pageContent = `
  <h1>Your Entire HTML Code</h1>
  <p>Place your HTML content for the page here.</p>
`;

const options = {};

ssg
  .addPage(pageConfig, pageContent, options)
  .catch((error) => console.error("Error generating page with ap-utils:", error));
```

## Required Fields in pageConfig

The `pageConfig` object requires the following fields:

- **title**: The title of your page.
- **description**: A short description of the page.
- **updatedAt**: The last update timestamp in ISO 8601 format (e.g., `2024-12-06T15:30:00Z`).
- **createdAt**: The creation timestamp in ISO 8601 format (e.g., `2024-12-01T09:00:00Z`).
- **path**: The relative URL path for the page (e.g., `/blog/seo/generate-static-files`). It should start with `/` and
  may include only `-` and `_` characters. The `.html` extension is optional, but the page will be generated as a
  `.html` file.

# Optional Fields in `pageConfig`

These fields are not mandatory but can enhance your page's functionality and SEO performance.

## SEO and Indexing Options

### `metaTitleTemplate`

Define a template for the meta title. For example, `"My Site - %s"` will replace `%s` with the page title.  
*(Details in the [setup config guide](./setup-config.md).)*

### `shouldFollowLinks`

- **Type**: `boolean`
- **Default**: `true`  
  Allows crawlers to follow links on the page. Set to `false` to add a `nofollow` directive.

### `shouldAllowIndexing`

- **Type**: `boolean`
- **Default**: `true`  
  Enables search engines to index this page. Set to `false` to add a `noindex` directive.

---

## Sitemap Configuration

### `changefreq`

- **Type**: `string`  
  Specifies how often the content changes (e.g., `daily`, `weekly`, `monthly`).  
  Helps search engines prioritize crawling frequency.

### `priority`

- **Type**: `number` (0.0 - 1.0)  
  Sets the priority of this URL in the sitemap. Higher values indicate higher importance.  
  Example:
- `1.0` for the homepage
- `0.5` for blog posts

---

## Social Media and Rich Snippets

### `ogImage`

- **Type**: `string` (URL)  
  URL of the OpenGraph image for social sharing.  
  **Recommended size**: `1200x630` pixels.

### `breadCrumbList`

- **Type**: `array`  
  Defines a structured breadcrumb trail for better navigation and rich results in search engines.  
  *(Refer to the [BreadcrumbList schema](./schemas/breadCrumb.md) for details.)*

## Other Schema Types for `pageConfig`

* **Article Schema**: To implement an article schema, see the detailed guide [here](./schemas/article.md).
* **BlogPosting Schema**: For setting up the BlogPosting schema, refer to this article [here](./schemas/blogpost.md).
* **SoftwareApplication Schema**: Learn how to configure the SoftwareApplication schema [here](./schemas/software.md).

## Next step: [Generate build](./generate-build.md)

