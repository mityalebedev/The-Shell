const  gulp  = require('gulp');
const { watch } = require('gulp');

// gulp plugins and utils
const sourcemaps = require('gulp-sourcemaps');
const zip = require('gulp-zip');
const sass = require('gulp-sass');
const browserSync = require("browser-sync").create();

sass.compiler = require('node-sass');

// css plugins
const autoprefixer = require('gulp-autoprefixer');

function reload() {
    browserSync.reload();
}

function styles() {
    return gulp.src('assets/scss/screen.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.stream());
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

function watchFiles() {
    browserSync.init({
        proxy: "localhost:2368"
    });

    watch(['assets/scss/**/*.scss'], styles);
    watch(['**/*.hbs'], styles);
}


exports.styles = styles;
exports.release = release;
exports.watch = watchFiles;
