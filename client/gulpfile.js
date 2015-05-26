var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var envify = require('envify/custom');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');


gulp.task('default', function () {
    return browserify('./js/main.js')
        .transform(babelify)
        .transform(envify({_: 'purge'}))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});
