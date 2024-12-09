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
├── src/              # Main source directory
│   ├── assets/       # Static resources
│   │   ├── css/      # CSS files for styling
│   │   ├── js/       # JavaScript files for functionality
│   │   ├── site/     # Site-specific assets (e.g., icons, logos)
│   │   └── uploads/  # Uploaded files or images
│   ├── components/   # Reusable UI components
│   ├── data/         # Data files (e.g., JSON, YAML)
│   └── pages/        # JavaScript files to generate html pages
```

## Folder Details and Usage

### `assets/`

- **`css/`**: Store your CSS files for styling.
- **`js/`**: Include your JavaScript files for functionality.
- **`site/`**: Keep essential site assets, such as:
    - `apple-touch-icon.png` *(180x180 pixels)*
    - `favicon-32x32.png` *(32x32 pixels)*
    - `favicon-16x16.png` *(16x16 pixels)*
    - `ogImage.png` *(1200x630 pixels, used as the default OpenGraph image for social sharing)*
    - *If `pwa.enabled` is set to `true` in `apssg.config.js`, also include:*
        - `android-chrome-192x192.png`
        - `android-chrome-512x512.png`
    - *if pwa enabled Include screenshots for pwa have these images inside site folder like this in the format*
        - **format**: `screen-[index]-[width]x[height].png`
        - examples
        - `screen-1-720x720.png`
        - `screen-2-720x720.png`
- **`uploads/`**: Use this folder for images or other uploaded files.

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