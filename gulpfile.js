/**
 * Created by Daniil on 06.08.2016.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    uncss = require('gulp-uncss'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    lib    = require('bower-files')();
    concat = require('gulp-concat');

gulp.task('less', function ()
{
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(prefix('last 4 versions'))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task('html', function ()
{

    gulp.src("*.html")
        .pipe(livereload());
});

gulp.task('css', function ()
{

    gulp.src(["styles/*.css", '!styles/build.css'])
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(concat('build.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('styles'))
        .pipe(livereload());
});

gulp.task('uncss', function ()
{
    gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(gulp.dest('./styles'));
});


gulp.task('js', function ()
{
    var vendors = lib.ext('js').files;
    vendors.push('scripts/**/*.js');
    vendors.push('!scripts/build.js');
    gulp.src(vendors)
        .pipe(sourcemaps.init())
        .pipe(concat('build.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('scripts'))
        .pipe(livereload());
});

gulp.task('watch', function ()
{
    livereload.listen();
    gulp.watch('less/*.less', ['less']);
    gulp.watch('styles/*.css', ['css']);
    gulp.watch(["*.html", '*.php'], ['html', 'uncss']);
    gulp.watch('scripts/**/*.js', ['js']);

});

gulp.task('default', ['watch']);