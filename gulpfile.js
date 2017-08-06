var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass');

gulp.task('task-name', function() {
	// Stuff here
});

gulp.task('scss', function() {
	var input = '**/stylesheets/**/*.scss',
		output = 'public/stylesheets/css';

	return gulp
		// Find all `.scss` files from the `stylesheets/` folder
		.src(input, {base: 'public'})
		// Run Sass on those files
		.pipe(sass())
		.pipe(concat('styles.css'))
		// Write the resulting CSS in the output folder
		.pipe(gulp.dest(output));
});
