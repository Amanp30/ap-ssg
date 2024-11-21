const fs = require("fs-extra");
const path = require("path");
const AssetExtractor = require("ap-assets-extractor");
const { logSuccess } = require("./logMessage");

exports.generateServiceWorkerFile = async function (config) {
  const filePath = path.join(process.cwd(), "build", "serviceworker.js");

  try {
    // Extract assets from HTML files using AssetExtractor
    let filesToCache = await new AssetExtractor("build").runExtractor(
      config.htmlFiles,
    );

    // Exclude external URLs (starting with http:// or https://)
    filesToCache = filesToCache.filter((file) => !file.startsWith("http"));

    // Generate service worker content dynamically
    const serviceWorkerContent = `
      const CACHE_NAME = \`pwa-cache-v${new Date().toString()}\`;
      const ASSETS_TO_CACHE = ${JSON.stringify(filesToCache, null, 2)};

      self.addEventListener('install', (event) => {
        event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching Assets');
            return cache.addAll(ASSETS_TO_CACHE);
          })
        );
      });

      self.addEventListener('activate', (event) => {
        const cacheWhitelist = [CACHE_NAME];
        event.waitUntil(
          caches.keys().then((cacheNames) => {
            return Promise.all(
              cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                  console.log('Service Worker: Deleting old cache', cacheName);
                  return caches.delete(cacheName);
                }
              })
            );
          })
        );
      });

      self.addEventListener('fetch', (event) => {
        event.respondWith(
          caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              console.log('Service Worker: Returning cached response for', event.request.url);
              return cachedResponse;
            }
            return fetch(event.request).then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
                console.log('Service Worker: Caching new resource', event.request.url);
              });
              return response;
            });
          })
        );
      });
    `;

    // Write the generated service worker file to the build folder
    await fs.writeFile(filePath, serviceWorkerContent.trim());
    logSuccess("Service Worker file successfully generated at:", filePath);
  } catch (error) {
    console.error("Error generating Service Worker file:", error);
  }
};
