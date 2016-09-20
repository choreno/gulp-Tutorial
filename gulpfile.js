var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create(); 
var del = require('del');
var runSequence = require('run-sequence'); 

// dist
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');



gulp.task('browserSync', function(){
    browserSync.init({
        server: {baseDir:'app'}
    })
})


gulp.task('hello', function () {
    console.log('hello TonyC');
})


gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss') // Get source files with gulp.src
        .pipe(sass()) // Sends it through a gulp plugin
        .pipe(gulp.dest('app/css')) // Outputs the file in the destination folder
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('watch', ['browserSync','sass'], function () {

    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    
    //other watchers

})

gulp.task('clean:dist', function(){
    return del.sync('dist') ;  

})

//Dist
gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()) )
    .pipe(gulpIf('*.css', cssnano() ))
    .pipe(gulp.dest('dist'))
})

gulp.task('fonts', function(){
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})


gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});



//Batch processings

gulp.task('build', function(callback){

    runSequence('clean:dist', ['sass','useref','images','fonts'], callback); 
})

gulp.task('default', function(callback){

    runSequence(['sass', 'browserSync','watch']) ; 
})






