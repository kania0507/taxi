var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');


// Font Awesome Icons
gulp.task('icons', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('src/assets/webfonts/'));
});



// Compile sass into CSS & auto-inject into browsers
//gulp.task('sass', function() {
	gulp.task('sass', gulp.series('icons', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
//		.on('error', handleError)
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.reload({ stream: true }));
}));


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./src",
		browser: "Firefox"
    });

    gulp.watch("src/scss/*.scss", gulp.series('sass'));
	gulp.watch("src/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
}));


gulp.task('run',   gulp.series('serve', function(){
	
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/*.html', browserSync.reload); 
  gulp.watch('src/js/**/*.js', browserSync.reload);
}));