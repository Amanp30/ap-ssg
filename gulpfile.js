const gulp = require("gulp");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const purgecss = require("@fullhuman/postcss-purgecss");
const fs = require("fs-extra");
const { logSuccess } = require("./lib/utils/logMessage");

function runGulp() {
  gulp.task("clean", (done) => {
    fs.emptyDirSync("build/assets/css");
    fs.emptyDirSync("build/assets/js");
    done();
  });

  gulp.task("styles", () => {
    return gulp
        .src("src/assets/css/**/*.css")
        .pipe(
            postcss([
              require("autoprefixer"),
              purgecss({
                content: ["build/**/*.html"],
                safelist: { standard: ["body", "html"], deep: [/^someclass/] },
              }),
              cssnano({ preset: "default" }),
            ])
        )
        .pipe(gulp.dest("build/assets/css"));
  });

  gulp.series("clean", "styles")();
  logSuccess("CSS purge and minification successful");
}

module.exports = runGulp;

