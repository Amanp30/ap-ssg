const fs = require("fs-extra");
const { getErrorPagePath } = require("../configs/paths");

async function generateDefaultErrorPage() {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 - Not Found</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #fff;
      color: #111;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    main {
      text-align: center;
      padding: 2rem;
    }

    h1 {
      font-size: 6rem;
      font-weight: 600;
      letter-spacing: -0.05em;
    }

    p {
      margin-top: 1rem;
      font-size: 1rem;
      color: #555;
    }

    a {
      display: inline-block;
      margin-top: 2rem;
      font-size: 0.95rem;
      color: #007aff;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s ease;
    }

    a:hover {
      border-color: #007aff;
    }
  </style>
</head>
<body>
  <main>
    <h1>404</h1>
    <p>Page not found.</p>
    <a href="/">← Back to home</a>
  </main>
</body>
</html>
  `.trim();

  try {
    await fs.outputFile(getErrorPagePath(), html);
  } catch (err) {
    console.error("❌ Error writing 404.html:", err);
  }
}

module.exports = generateDefaultErrorPage;
