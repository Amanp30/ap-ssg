## Folder Structure Setup

The recommended and easiest way to set up your folder structure is by using the automated setup command. This ensures
consistency and saves time.

**Note**: Make sure you have already set up the `apssg.config.js` file before running the command.

### Automated Setup

To quickly generate the necessary folder structure, run the following command in your terminal:

```shell
npx ap-ssg folder-setup
```

This will automatically create the required folders and subfolders for your project according to the predefined
structure.

### Required Folder Structure

If you prefer manual setup, your project structure must look like this:

```plaintext
root/
│
├── src/              # Main source directory for project files
│   ├── assets/       # Static resources for the site
│   │   ├── css/      # CSS files for styling the website
│   │   ├── js/       # JavaScript files for functionality
│   │   ├── site/     # Site-specific assets (e.g., icons, logos, fonts)
│   │   ├── uploads/  # Uploaded media files like images and videos
│   │   └── robots.txt # Optional: Robots.txt file for controlling web crawlers
│   ├── components/   # Reusable UI components for building pages
│   ├── data/         # Data files (e.g., JSON, YAML) for dynamic content
│   └── pages/        # JavaScript files for generating HTML pages
```

## Folder Details and Usage

### `assets/`

- **`css/`**: Store your CSS files for styling.
- **`js/`**: Include your JavaScript files for functionality.
- **`site/`**: Keep essential site assets, such as:
  - `apple-touch-icon.png` _(180x180 pixels)_
  - `favicon-32x32.png` _(32x32 pixels)_
  - `favicon-16x16.png` _(16x16 pixels)_
  - `ogImage.png` _(1200x630 pixels, used as the default OpenGraph image for social sharing)_
  - _If `pwa.enabled` is set to `true` in `apssg.config.js`, also include:_
    - `android-chrome-192x192.png`
    - `android-chrome-512x512.png`
  - _if pwa enabled Include screenshots for pwa have these images inside site folder like this in the format_
    - **format**: `screen-[index]-[width]x[height].png`
    - examples
    - `screen-1-720x720.png`
    - `screen-2-720x720.png`
- **`uploads/`**: Use this folder for images or other uploaded files.
- **`robots.txt`**: Optional You can create a custom `robots.txt` file. If not provided, a default `robots.txt` file will be generated automatically.

---

### `components/`

This folder is for reusable UI components like a navbar, share buttons, or other common elements.

- **Optional**: You can delete this folder if not needed or modify its purpose.

---

### `data/`

Use this folder to store external data, such as:

- JSON files
- MongoDB aggregation data
- Data from other databases

- **Optional**: Like `components`, this folder is not mandatory and can be removed if unnecessary.

---

### `pages/`

Contains JavaScript files responsible for generating HTML pages. These files act as the backbone of your static site
generation.

Learn [how to create files and generate pages](./how-to-create-pages.md) using the package.
