## BreadCrumbList Schema

The **BreadCrumbList** schema is used to enhance site navigation and improve SEO by providing structured breadcrumb
data. You can define the breadcrumb trail for each page by adding a `breadCrumbList` field to the `pageConfig` object.

### Example Configuration

Here’s an example of a `pageConfig` object with a `breadCrumbList`:

```javascript
const pageConfig = {
  // other configuration fields
  breadCrumbList: [
    { name: "Home", item: "/" }, // Root breadcrumb
    { name: "Blog", item: "/blog" }, // Parent section
    { name: "Post Title", item: "/blog/post-title" } // Current page
  ]
};
```