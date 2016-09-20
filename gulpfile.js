var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create(); 
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('bs', function(){
    bs.init({
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
        .pipe(bs.reload({stream: true}))
})



gulp.task('watch', ['bs','sass'], function () {

    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', bs.reload);
    gulp.watch('app/js/**/*.js', bs.reload);
    
    //other watchers


})


//PRODUCTION ..................

gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()) )
    .pipe(gulpIf('*.css', cssnano() ))
    .pipe(gulp.dest('dist'))
})

gulp.task('font', function(){
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})





// var gutil = require('gulp-util');
// var jshint = require('gulp-jshint'); 


// gulp.task('default', ['watch'] ) ;


// gulp.task('jshint', function(){
//     return gulp.src('source/javascript/**/*.js')
//             .pipe(jshint())
//             .pipe(jshint.reporter('jshint-stylish'));
// })


// gulp.task('watch', function(){
//     gulp.watch('source/javascript/**/*.js', ['jshint']);
// })

