var gulp = require('gulp');
var minify = require('gulp-minify')
var clean = require('gulp-clean')
var stripDebug = require('gulp-strip-debug')

gulp.task('clean', async function () {
    gulp.src('./dist/*', { read: false }).pipe(clean());
});

gulp.task('build', async function () {
    gulp.src('./src/*.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('./dist'))
        .pipe(minify()).pipe(gulp.dest('./dist'));
});

gulp.task('rebuild', gulp.series('clean', 'build'))

gulp.task('default', async function () {
    gulp.watch('./src/*.js', gulp.series('rebuild'))
})