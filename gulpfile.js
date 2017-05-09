const gulp = require('gulp');
const inject = require('gulp-inject');
const wiredep = require('wiredep').stream;
const browserSync = require('browser-sync');

/* injects the files that you create */
gulp.task('inject', ['inject:bower'], function() {
	var sources = gulp.src([
		'./src/app/*.module.js',										// Define the files we'd like to inject
		'./src/app/**/*.module.js', 						// *.module.js files go first
		'./src/app/**/*.js', 								// *.js files come next
		'./src/app/**/*.css'								// *.css files come next
	]);

    return gulp.src('./src/index.html') 							// Read your index.html
        .pipe(inject(sources, { relative: true })) 		// Pipe it through gulp-inject
        .pipe(gulp.dest('./src/')); 						// Write it out to ./
});

/* injects your bower dependencies */
gulp.task('inject:bower', function() {
    return gulp.src('./src/index.html') 					// Read your index.html
        .pipe(wiredep()) 								// Pipe it through wiredep
        .pipe(gulp.dest('./src/')); 						// Write it out to ./
});

/* watches for changes made to your files */
gulp.task('watch', function() {
    return gulp
        .watch('./src/**/*', ['reload']); 				// Watch for any changes in your app folder
    													// which will trigger the 'reload' task
});

/* reloads the browser */
gulp.task('reload', function() {
    return browserSync.reload(); 						// reloads your app through browser-sync
})

/* starts a browser-sync server */
gulp.task('serve', ['inject', 'watch'], function() {
    return browserSync.init({ 							// starts a browser-sync service
        server: './src' 									// serving the ./ directory
    })
});
