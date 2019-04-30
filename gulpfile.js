/**
  * This is an gulf configuration file that setup tasks for automatically run
  * By convention, a default task(s) should be set with a 'default' keyword
  *
  **/

const { src, dest, watch, parallel, series} = require('gulp'); // plugin for task runner
const imagemin = require('gulp-imagemin'); // plugin to minify images
const cleancss = require('gulp-clean-css'); // plugin to minify css
const htmlmin = require('gulp-htmlmin'); // plugin to minify html
const uglify = require('gulp-uglify'); // plugin to minify javascript
const autoprefixer = require('gulp-autoprefixer'); // plugin for prefixing css
const sass = require('gulp-sass'); // plugin for converting sass/scss to css
const browsersync = require('browser-sync').create(); // plugin for live css reload & browser syncing
const rename = require('gulp-rename');  // plugin for rename the processed files
const concat = require('gulp-concat'); // plugin for concate files
const sourcemaps = require('gulp-sourcemaps'); // plugin for getting the original codes for debugging

/**
  * Source and destination folders
  **/
/*** Source ***/
const srcHtml = 'src/index.html';
const srcJs = 'src/js/**/*';
const srcCss = 'src/css/**/*';
const srcScss = "src/css/**/*";
const srcImg = 'src/img/**/*';  // **/* (wildcard) means include all file in current folders and its subfolders

/*** Destination ***/
const distHtml = 'dist/';
const distJs = 'dist/js';
const distCss = 'dist/css';
const distImg = 'dist/img';

/*** Minify image ***/
function compressimg() {
  return src(srcImg)
    .pipe(imagemin())
    .pipe(dest(distImg))
}

/*** Minify CSS ***/
function compresscss() {
  return src(srcCss)
  .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleancss({compatibility: 'ie8'}))   /* option for making compatibable with IE8 */
    .pipe(sourcemaps.write())
    .pipe(dest(distCss))
}

/*** Convert SASS and minify CSS ***/
function convertsasstocss() {
  return src(srcScss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix: ".min"}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleancss({compatibility: 'ie8'}))   /* option for making compatibable with IE8 */
    .pipe(sourcemaps.write())
    .pipe(dest(distCss))
    .pipe(browsersync.stream());  // emit a signal for reload the browser
}

/*** Minify HTML ***/
function compresshtml() {
  return src(srcHtml)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest(distHtml))
    .pipe(browsersync.stream());
}

/*** Minify JavaScript ***/
function compressjs() {
  return src(srcJs)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('bundle.js'))  // bundle all the javascript files
    .pipe(sourcemaps.write())
    .pipe(dest(distJs))
    .pipe(browsersync.stream());
}

/**
 *  Purpose: This function for reloading the webpage without manualy refresh the browser
 **/
function livereload() {
  browsersync.init({
    server: {
      baseDir: "./dist"
    }
  });
}

function watchtask() {
  watch([srcScss], convertsasstocss)
  .on('change', (path, stats) => {
    console.log(`Scss files in ${path} are converting to css file with compression ...`);
  });
  watch([srcHtml], compresshtml)
  .on('change', (path, stats) => {
    console.log(`HTML files in ${path} are minifying ...`);
  });
  watch([srcJs], compressjs)
  .on('change', (path, stats) => {
    console.log(`Javascript files in ${path} are minifying ...`);
  });
}

exports.compressimg = compressimg;  // The name of the tasks runner and export it
exports.compresscss = compresscss;
exports.convertsasstocss = convertsasstocss;
exports.compresshtml = compresshtml;
exports.compressjs = compressjs;
exports.watchtask = watchtask;
exports.livereload = livereload;

/* series() - Combines task functions and/or composed operations into larger operations that will be executed one after another, in sequential order.
 * parallel() - Combines task functions and/or composed operations into larger operations that will be executed simultaneously.
 *
 **/

exports.build = series(parallel(compressimg, compressjs, convertsasstocss), compresshtml);  // Define a build task for implementing the minify jobs
exports.default = series(parallel(compressimg, compressjs, convertsasstocss), compresshtml, parallel(watchtask, livereload));  // Defined a default tasks for executing one after another by using the function "series"
