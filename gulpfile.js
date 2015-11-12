'use strict';
var gulp = require('gulp');
var _$ = require('gulp-load-plugins')();
var packager = require('electron-packager');
var noop = function () {};

const SRCJS = ['./app/js/index.js', './app/js/models/*.js', './app/js/collections/*.js', './app/js/views/*.js', './app/js/routers/*.js', './app/js/app.js'];

// ***** JS ***** //

gulp.task('scripts', function() {
  gulp.src(SRCJS)
  /*.pipe(_$.browserify({
      insertGlobals: true
    }))*/
  .pipe(_$.concat('main.js'))
  .pipe(gulp.dest('./app/js/'))
  // Minify
  .pipe(_$.uglify())
  .pipe(_$.concat('main.min.js'))
  .pipe(gulp.dest('./app/js/'));
});

gulp.task('js', ['scripts']);

// ***** CSS ***** //

gulp.task('stylus', function() {
  gulp.src('./app/css/*.styl')
    .pipe(_$.stylus())
    .pipe(_$.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./app/css/'))
    // Minify
    .pipe(_$.csso())
    .pipe(_$.concat('estilos.min.css'))
    .pipe(gulp.dest('./app/css/'));
});

// ***** Watch ***** //

gulp.task('watch', function() {
  gulp.watch(SRCJS, ['js']);
  gulp.watch('./app/css/*.styl', ['stylus']);
});

// ***** Build ***** //

gulp.task('clean', function() {
  return gulp.src(['./build/'], {read: false})
  .pipe(_$.clean({ force: true }));
});

gulp.task('install-node', _$.shell.task('cd app/ && npm install'));

gulp.task('build', ['clean', 'install-node'], function() {
  return packager({
    'dir': './app',
    'name': 'iVooxNode',
    'version': '0.34.3',
    'all': true,
    // 'asar': false,
    'app-version': '0.1.0',
    'out': 'build',
    'ignore': ['/js/(collections|models|routers|views|app.js|index.js|main.js)', '/css/(estilos.styl|icons-fonts.styl|icons-fonts.css|estilos.css)'],
    }, function done(err, path) { if(err) {console.error(err);}else{ console.log(path); } });
});