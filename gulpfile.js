var gulp = require('gulp');

// gulp plugins and utils
var sourcemaps = require('gulp-sourcemaps');
var zip = require('gulp-zip');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

// css plugins
var autoprefixer = require('gulp-autoprefixer');

function styles() {
    return gulp.src('assets/scss/screen.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(gulp.dest('/assets/css/'))
}

function release() {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**',
        '!assets/scss', '!assets/scss/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
}


exports.styles = styles;
exports.release = release;
