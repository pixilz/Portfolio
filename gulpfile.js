const gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	data = require('gulp-data'),
	fs = require('fs'),
	path = require('path'),
	merge = require('gulp-merge-json');

gulp.task('scss', function() {
	const input = '**/stylesheets/**/*.scss',
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

gulp.task('pug:data', function() {
	return gulp
		.src('templateData/**/*.json')
		.pipe(merge({
			fileName: 'data.json',
			edit: (json, file) => {
				let filename = path.basename(file.path),
					primaryKey = filename.replace(path.extname(filename), '');

				let data = {};

				data[primaryKey.toUpperCase()] = json;

				return data;
			}
		}))
		.pipe(gulp.dest('/temp'));
});

gulp.task('pug', gulp.series('pug:data', function() {
	return gulp
		.src('views/index.pug')
		.pipe(data(function() {
			return JSON.parse(fs.readFileSync('/temp/data.json'));
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./'));
}));

gulp.task('pug:watch', function() {
	return gulp.watch('views/**/*.pug', gulp.parallel('pug'));
});

gulp.task('scss:watch', function() {
	return gulp.watch('**/stylesheets/**/*.scss', gulp.parallel('scss'));
});