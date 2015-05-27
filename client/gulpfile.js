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


gulp.task('javascript', ['clean'], function() {
    return browserify('./js/main.js')
        .transform(babelify)
        .transform(envify({_: 'purge'}))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('less', ['clean'], function() {
    return gulp.src('./css/main.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('rev', ['javascript', 'less'], function() {
    var revAll = new RevAll({dontRenameFile: [/^\/index.html/g]});
    gulp.src('dist/**')
        .pipe(revAll.revision())
        .pipe(gulp.dest('cdn'));
});

gulp.task('clean', function(cb) {
    del([
        './dist/',
        './cdn/'
    ], cb);
});

gulp.task('default', ['clean', 'javascript', 'less', 'rev']);
