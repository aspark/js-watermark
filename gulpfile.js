var gulp = require('gulp');
var minify = require('gulp-minify')
var clean = require('gulp-clean')
var stripDebug = require('gulp-strip-debug')

gulp.task('clean', function(){
    gulp.src('./dist/*', {read:false}).pipe(clean());
});

gulp.task('build', ['clean'], function(){
    gulp.src('./src/*.js')
    .pipe(stripDebug())
    .pipe(gulp.dest('./dist'))
    .pipe(minify()).pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build'], function(){
    gulp.watch('./src/*.js', ['build'])
})