var gulp = require('gulp');
var minify = require('gulp-minify')
var clean = require('gulp-clean')

gulp.task('clean', function(){
    gulp.src('./dist/*', {read:false}).pipe(clean());
});

gulp.task('build', ['clean'], function(){
    gulp.src('./src/*.js')
    .pipe(gulp.dest('./dist'))
    .pipe(minify()).pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build'], function(){
    gulp.watch('./src/*.js', ['build'])
})