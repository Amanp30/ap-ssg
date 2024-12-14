interface DocumentBaseConfig {
    /**
     * The title for the page, displayed in the browser's title bar or tab.
     */
    title: string;

    /**
     * The meta description for the page, which appears in search engine results.
     */
    description: string;

    /**
     * The date when the page was last updated, in ISO 8601 format.
     * @example "2024-11-04T10:00:00Z"
     */
    updatedAt: string;

    /**
     * The date when the page was originally created, in ISO 8601 format.
     * @example "2024-11-04T10:00:00Z"
     */
    createdAt: string;

    /**
     * The relative URL path for the page, which should start with a forward slash (/).
     * It may include only hyphens (-) and underscores (_) as valid characters.
     * The `.html` extension is optional, but the page will be generated as a `.html` file.
     * @example "/blog/seo/generate-static-files" will be generated as "/blog/seo/generate-static-files.html"
     * @example "/about-us" will be generated as "/about-us.html"
     * @example "/services/web-development" will be generated as "/services/web-development.html"
     */
    path: string;

    //   optionals
    /**
     * Template for the page's meta title, where placeholders like %title and %siteName can be used.
     * You can use any separator, prefix, or suffix to customize the title format as needed.
     * Placeholders like %title will be replaced with the actual title, and %siteName with the configured site name.
     * @example "%title - %siteName" will output "How to do something - My Website"
     * @example "%siteName | %title" will output "My Website | How to do something"
     */
    metaTitleTemplate?: string;

    /**
     * Allows crawlers to follow links on the page.
     * Set to false to add a nofollow directive.
     * @default true
     */
    shouldFollowLinks?: boolean;

    /**
     * Enables search engines to index this page.
     * Set to false to add a noindex directive.
     * @default true
     */
    shouldAllowIndexing?: boolean;

    /**
     * Specifies how often the content changes (e.g., daily, weekly, monthly).
     * Helps search engines prioritize crawling frequency.
     * Valid values: "always", "hourly", "daily", "weekly", "monthly", "yearly", "never".
     * @example "daily" for frequently updated content.
     * @example "monthly" for less frequently updated content.
     */
    changefreq?:
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never";

    /**
     * Sets the priority of this URL in the sitemap.
     * Higher values indicate higher importance (0.0 - 1.0).
     * Default is 1.
     * @example
     * 1.0 for the homepage, 0.5 for blog posts.
     */
    priority?: number; // Default: 1, should be between 0 and 1

    /**
     * URL of the OpenGraph image for social sharing.
     * Recommended size: 1200x630 pixels.
     * @example "https://amanpareek.in/assets/post-og.png" for an external image hosted on another server.
     * @example "/assets/uploads/post-og.png" for a locally hosted image, placed in the 'src/assets/uploads' folder.
     */
    ogImage?: string;

    /**
     * Defines the breadcrumb trail for the page, enhancing site navigation and improving SEO.
     * Breadcrumbs help search engines understand the page hierarchy and how different pages are related.
     * @example
     * [
     *   { name: "Home", item: "/" }, // Root breadcrumb
     *   { name: "Blog", item: "/blog" }, // Parent section
     *   { name: "Post Title", item: "/blog/post-title" } // Current page
     * ]
     * @example
     * [
     *   { name: "Home", item: "/" },
     *   { name: "Smartphones", item: "/smart-phones" },
     *   { name: "E 720", item: "/e_730_phone" }
     * ]
     */
    breadCrumbList?: { name: string; item: string }[];

    /**
     * Specifies the language of the page content, using an ISO 639-1 code or a BCP 47 language tag.
     * @default en
     * @example "en" for English
     * @example "fr" for French
     * @example "en-US" for English (United States)
     */
    pageLanguage?: string;

    /**
     * Twitter handle with or without @ followed by your userID
     * @example
     *  "@amanp30"
     *  @example
     *  amanp30
     */
    twitterHandle?: string;
}


export {DocumentBaseConfig}