const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const htmlMin = require("gulp-htmlmin");
const cssMin = require("gulp-clean-css")
const jsMin = require("gulp-uglify");

gulp.task("minifyHTML", () =>
{
	return gulp.src("src/*.html" )
		.pipe(htmlMin({collapseWhitespace: true}))
		.pipe(gulp.dest("dist"));
})

gulp.task("minifyCSS", () =>
{
	return gulp.src("src/css/*.css")
		.pipe(cssMin({compatibility: "ie8"}))
		.pipe(gulp.dest("dist/css"));
})

gulp.task("minifyJS", () =>
{
	function createErrorHandler(name) {
		return function (err) {
			console.error("Error from " + name + " in compress task", err.toString());
		};
	}
	
	return gulp.src("src/js/*.js")
	.on("error", createErrorHandler("gulp.src"))
	.pipe(jsMin())
	.on("error", createErrorHandler("uglify"))
	.pipe(gulp.dest("dist/js"))
	.on("error", createErrorHandler("gulp.dest"));
})

gulp.task("browserSync", () =>
{
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	})
	gulp.watch("src/*.html", gulp.task("minifyHTML"));
	gulp.watch("src/css/*.css", gulp.task("minifyCSS"))
	gulp.watch("src/js/*.js", gulp.task("minifyJS"))
	gulp.watch("dist/*", browserSync.reload)
});

gulp.task("default", gulp.series("browserSync"))
