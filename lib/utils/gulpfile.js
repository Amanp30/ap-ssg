const gulp = require("gulp");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const { getBuildCssDirPath } = require("../configs/paths");

function runGulp() {
  gulp.task("styles", () => {
    return gulp
      .src("src/assets/css/**/*.css")
      .pipe(postcss([require("autoprefixer"), cssnano({ preset: "default" })]))
      .pipe(gulp.dest(getBuildCssDirPath()));
  });

  return new Promise((resolve, reject) => {
    gulp.series("styles")((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = runGulp;
