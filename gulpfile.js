const gulp = require("gulp")
const browserSync = require("browser-sync").create();
const htmlMin = require("gulp-htmlmin");
const cssMin = require("gulp-clean-css")
const terser = require("gulp-terser");
const ftp = require("vinyl-ftp");
const env = require("gulp-env");
env({
	file: ".env",
	type: ".ini"
});

gulp.task("minifyHTML", () =>
{
	return gulp.src("src/*.html" )
		.pipe(htmlMin({collapseWhitespace: true}))
		.pipe(gulp.dest("dist"));
});

gulp.task("minifyCSS", () =>
{
	return gulp.src("src/css/main.css")
		.pipe(cssMin({compatibility: "ie8"}))
		.pipe(gulp.dest("dist/css"));
});

gulp.task("minifyJS", () =>
{
	function createErrorHandler(name)
	{
		return function (err)
		{
			console.error("Error from " + name + " in compress task", err.toString());
		};
	}

	return gulp.src("src/js/*.js")
		.on("error", createErrorHandler("gulp.src"))
		.pipe(terser())
		.on("error", createErrorHandler("terser"))
		.pipe(gulp.dest("dist/js"))
		.on("error", createErrorHandler("gulp.dest"));
});

gulp.task("movePHPFiles", () =>
{
	return gulp.src("src/api/*.php")
		.pipe(gulp.dest("dist/api"))
});

gulp.task("watchFiles", () =>
{
	gulp.watch("src/*.html", gulp.task("minifyHTML"));
	gulp.watch("src/css/*.css", gulp.task("minifyCSS"));
	gulp.watch("src/js/*.js", gulp.task("minifyJS"));
	gulp.watch("src/api/*.php", gulp.task("movePHPFiles"))
});

gulp.task("ftp", () =>
{
	let conn = ftp.create(
	{
		host: process.env.host,
		user: process.env.user,
		pass: process.env.pass,
		parallel: 1,
	});
	return gulp.src("dist/**", {base: "dist", dot: true})
		.pipe(conn.newer("/"))
		.pipe(conn.dest("/"));
});

gulp.task("deploy", () =>
{
	gulp.watch("dist", gulp.task("ftp"));
});

gulp.task("browserSync", () =>
{
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	});
	gulp.watch("dist").on("change", browserSync.reload)
});

gulp.task("default", gulp.series(gulp.parallel("watchFiles", "deploy")));
