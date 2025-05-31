import DocumentBaseConfig = require("./pageConfigRequired");
import ArticleOptions = require("./schemas/article");
import Software = require("./schemas/software");
import BlogPostOptions = require("./schemas/blogpost");

interface pageConfigType {
  type?: never;
}

type defaultType = pageConfigType | ArticleOptions | BlogPostOptions | Software;

type pageConfig = DocumentBaseConfig & defaultType;

interface pageOptions {
  /**
   * Array of strings to insert into the head section of the HTML page.
   * @example
   * [
   *   '<link rel="stylesheet" href="/assets/css/styles.css">',
   *   '<script src="/assets/js/script.js"></script>'
   * ]
   */
  insertHead?: string[];

  /**
   * Array of strings to insert into the end of the body section of the HTML page.
   * @example
   * [
   *   '<script src="/assets/js/some_js_file.js"></script>'
   * ]
   */
  insertBodyEnd?: string[];
}

/**
 * Represents the content for the page, which will be a string (e.g., HTML content).
 * @example "<h1>Hello, World!</h1><p>This is a sample page content.</p>"
 */
type _PageContentType = string;

declare namespace APTypes {
  export type PageConfig = pageConfig;
  export type PageContentType = _PageContentType;
  export interface PageOptions extends pageOptions {}
}

export = APTypes;
