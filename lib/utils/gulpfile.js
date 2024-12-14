const gulp = require("gulp");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const fs = require("fs-extra");

function runGulp() {
  gulp.task("clean", (done) => {
    fs.emptyDirSync("build/assets/css");
    fs.emptyDirSync("build/assets/js");
    done();
  });

  gulp.task("styles", () => {
    return gulp
      .src("src/assets/css/**/*.css")
      .pipe(postcss([require("autoprefixer"), cssnano({ preset: "default" })]))
      .pipe(gulp.dest("build/assets/css"));
  });

  gulp.series("clean", "styles")();
  const message = "CSS purge and minification successful";
  return message;
}

module.exports = runGulp;
