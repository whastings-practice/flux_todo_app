'use strict';

var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var connect = require('connect');
var connectLR = require('connect-livereload');
var browserify = require('browserify');
var gulp = require('gulp');
var gulpLR = require('gulp-livereload');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var serveStatic = require('serve-static');

/**
 * Inspirations:
 * https://github.com/dmitriz/gulp-automation/blob/master/Gulpfile.js
 */

var isLR = false;

gulp.task('build_js', function() {
  var builder = browserify({
    debug: true,
    entries: './js/app.jsx',
    transform: [babelify]
  });

  builder = builder.bundle()
    .pipe(source('./js/app.jsx'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('.'));

  if (isLR) {
    builder = builder.pipe(gulpLR());
  }

  builder.on('error', gutil.log);

  return builder;
});

gulp.task('build_css', function() {
  var builder = gulp.src('./css/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('.'));

  if (isLR) {
    builder = builder.pipe(gulpLR());
  }

  return builder;
});

gulp.task('watch_dev', function() {
  var jsTask = ['build_js'];

  gulpLR.listen();
  isLR = true;

  gulp.watch('./css/**/*.scss', ['build_css']);
  gulp.watch('./js/**/*', jsTask);
  gulp.watch('./index.html', jsTask);
});

gulp.task('serve_dev', function() {
  connect()
    .use(connectLR())
    .use(serveStatic(__dirname))
    .listen(8000);
});

gulp.task('dev', ['build_js', 'build_css', 'watch_dev', 'serve_dev']);
gulp.task('default', ['dev']);
