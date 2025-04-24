const webpack = require("webpack");
const config = require("../configs/webpack.config");

function runWebpack() {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        console.error("Webpack encountered an error:", err);
        return reject(err);
      }

      if (stats.hasErrors()) {
        console.error(
          "Webpack compilation errors:\n",
          stats.toString({ all: false, errors: true, colors: true })
        );
        return reject(new Error("Webpack build failed with errors."));
      }

      resolve();
    });
  });
}

module.exports = runWebpack;
