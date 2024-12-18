const webpack = require("webpack");
const config = require("../configs/webpack.config");

function runWebpack() {
  webpack(config, (err, stats) => {
    if (err) {
      console.error("Webpack encountered an error:", err);
      return;
    }

    // Log the results
    // console.log(stats.toString({
    //     colors: true,  // Color output
    //     children: false,  // Disable child compilation info
    //     chunks: false,  // Disable chunk information
    // }));

    return "Webpack build complete";
  });
}

module.exports = runWebpack;
