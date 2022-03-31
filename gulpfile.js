const gulp = require("gulp")
const browserSync = require("browser-sync").create();
const htmlMin = require("gulp-htmlmin");
const cssMin = require("gulp-clean-css")
const terser = require("gulp-terser");

const github = (process.env.github) ? true : false;

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

gulp.task("browserSync", () =>
{
	browserSync.init({
		// server: {
		// 	baseDir: "dist"
		// },
		proxy: "https://rohitpai.co.uk/",
		serveStatic: ["./dist"]

	});
	gulp.watch("dist").on("change", browserSync.reload)
});

gulp.task("default", async () => 
{
	if(github)
	{
		(gulp.series("movePHPFiles", "minifyJS", "minifyHTML", "minifyCSS")());
	}
	else
	{
		(gulp.series(gulp.parallel("watchFiles", "browserSync"))());
	}
});

//gulp.task("default", gulp.series(gulp.parallel("watchFiles", "browserSync")));

