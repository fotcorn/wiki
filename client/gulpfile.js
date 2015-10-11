var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var envify = require('envify/custom');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var RevAll = require('gulp-rev-all');
var del = require('del');
var merge = require('merge-stream');
var fs = require('fs');


gulp.task('javascript', ['clean'], function() {
    var env = process.env;
    env._ = 'purge';
    return browserify('./js/main.js')
        .transform(babelify)
        .transform(envify(env))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/static/'));
});

gulp.task('less', ['clean'], function() {
    return gulp.src('./css/main.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/static/css/'));
});

gulp.task('copy', ['clean'], function() {
    var indexHtml = gulp.src('./index.html').pipe(gulp.dest('./dist/'));

    var robotoFont = gulp.src('./node_modules/roboto-font/fonts/**/*').pipe(gulp.dest('./dist/static/fonts/'));

    var images = gulp.src('./img/**/*').pipe(gulp.dest('./dist/static/img/'));

    return merge(indexHtml, robotoFont, images);
});

gulp.task('rev', ['javascript', 'less', 'copy'], function() {
    var revAll = new RevAll({dontRenameFile: [/^\/index.html/g]});
    return gulp.src('./dist/**')
        .pipe(revAll.revision())
        .pipe(gulp.dest('./cdn/'));
});

gulp.task('clean', function(cb) {
    del([
        './dist/',
        './cdn/'
    ], cb);
});

gulp.task('default', ['clean', 'javascript', 'less', 'rev']);
