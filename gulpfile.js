/* jshint node:true, camelcase:false */
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require("gulp-jshint");
var sourcemaps = require("gulp-sourcemaps");
var karma = require('karma').server;

gulp.task("test", function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('js', function () {

  return gulp.src("travelmap.js")
    .pipe(sourcemaps.init())
    .pipe(uglify({ preserveComments: "some" }))
    .pipe(sourcemaps.write('.'))
    .pipe(rename(function (path) {
    if (path.extname === '.js') {
      path.basename += '.min';
    }
  }))
    .pipe(gulp.dest("."));
});

gulp.task('lint', function () {
  return gulp.src("src/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Default should be to build the js file
gulp.task('default', ['lint', 'js'], function () {
});