const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const getWebpackFiles = require("../utils/getWebpackFiles");

module.exports = {
  mode: "production",
  entry: getWebpackFiles(), // custom webpack files object function
  output: {
    path: path.resolve(process.cwd(), "build/assets/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JavaScript files
        exclude: /node_modules/, // Don't transpile node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: "commonjs", // Keep ES Modules intact for tree shaking
                },
              ],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    usedExports: true, // Enable tree shaking (remove unused exports)
    minimize: true, // Enable minification in production
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            toplevel: true, // Mangle top-level variables and functions
          },
          keep_fnames: true, // Keep function names (important for debugging)
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean build folder before each build
  ],
};
