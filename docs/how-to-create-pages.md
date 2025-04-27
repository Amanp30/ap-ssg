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

const options = {
  insertHead: [
    "<link rel=\"stylesheet\" href=\"styles.css\">",
    "<script src=\"script.js\"></script>"
  ],
  insertBodyEnd: ["<script src=\"/assets/js/some_js_file.js\"></script>"]
  insertHead: ['<link rel="stylesheet" href="/assets/css/styles.css">'],
  insertBodyEnd: ['<script src="/assets/js/some_js_file.js"></script>'],
};

ssg
  .addPage(pageConfig, pageContent, options)
  .catch((error) =>
    console.error("Error generating page with ap-utils:", error)
  );
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
_(Details in the [setup config guide](./setup-config.md).)_

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
  _(Refer to the [BreadcrumbList schema](./schemas/breadCrumb.md) for details.)_

## Other Schema Types for `pageConfig`

- **Article Schema**: To implement an article schema, see the detailed guide [here](./schemas/article.md).
- **BlogPosting Schema**: For setting up the BlogPosting schema, refer to this article [here](./schemas/blogpost.md).
- **SoftwareApplication Schema**: Learn how to configure the SoftwareApplication schema [here](./schemas/software.md).

## The `options` Object

The options object allows you to inject additional HTML elements, such as meta tags, scripts, and stylesheets, into the page.

Accepted Fields

- `insertHead`: An array of strings to insert content into the <head> section of the page (e.g., stylesheets, meta tags, or scripts).
- `insertBodyEnd`: An array of strings to insert content at the end of the <body> section (e.g., JavaScript files).

**Example**

```javascript
{
    insertHead: [
      '<link rel="stylesheet" href="styles.css">',
      '<script src="script.js"></script>',
      '<link rel="stylesheet" href="/assets/css/styles.css">',
    ],
    insertBodyEnd: ['<script src="/assets/js/some_js_file.js"></script>'],
  }
```

## Next step: [Generate build](./generate-build.md)
