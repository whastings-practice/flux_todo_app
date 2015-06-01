'use strict';

var aliasify = require('aliasify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var connect = require('connect');
var connectLR = require('connect-livereload');
var browserify = require('browserify');
var gulp = require('gulp');
var gulpLR = require('gulp-livereload');
var gutil = require('gulp-util');
var path = require('path');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var serveStatic = require('serve-static');
var uglify = require('gulp-uglify');

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

gulp.task('dist_js', function() {
  var builder = browserify({
    entries: './js/app.jsx',
    transform: [babelify]
  });

  return builder
    .transform(aliasify, {
      aliases: {
        'react/lib/ReactComponentWithPureRenderMixin': './node_modules/react/lib/ReactComponentWithPureRenderMixin',
        react: './node_modules/react/dist/react.min.js'
      },
      appliesTo: {includeExtensions: ['.js', '.jsx']}
    })
    .bundle()
    .pipe(source('./js/app.jsx'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build_css', function() {
  var builder = gulp.src('./css/app.scss')
    .pipe(sass({
      includePaths: [path.join(__dirname, 'node_modules')]
    }).on('error', sass.logError))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('.'));

  if (isLR) {
    builder = builder.pipe(gulpLR());
  }

  return builder;
});

gulp.task('dist_css', function() {
  return gulp.src('./css/app.scss')
    .pipe(sass({
      includePaths: [path.join(__dirname, 'node_modules')],
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist', ['dist_css', 'dist_js'], function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist'));
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
