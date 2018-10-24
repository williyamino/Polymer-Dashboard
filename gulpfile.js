var gulp        = require('gulp');
var insert      = require('gulp-insert');
var sass        = require('gulp-sass');
var runSequence = require('run-sequence');
var $           = require('gulp-load-plugins')();


sass.compiler = require('node-sass');

gulp.task('sass', function () {
    gulp.src('app/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("app/css"));

    gulp.src('app/css/skins/default/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("app/css/skins/default"))
});

gulp.task('sass:watch', function () {
    gulp.watch('app/css/*.scss', ['sass']);
    gulp.watch('app/css/skins/default/*.scss', ['sass']);
});

gulp.task('insert', function(){
    gulp.src(['app/css/skins/default/color-vars.css'])
        .pipe(insert.append('</style>'))
        .pipe(insert.prepend('<style is=\'custom-style\'>'))
        .pipe(gulp.dest('app/css/skins/default/'));
});

gulp.task('copy', function(){

    var colorVars = gulp.src(['app/css/skins/default/color-vars-body.css'])
        .pipe($.rename('color-vars.css'))
        .pipe(gulp.dest('app/css/skins/default'));

    return colorVars;
});

gulp.task('default',  function (cb) {
    runSequence(
        ['sass', 'copy'],
        ['insert'],
        cb)
});