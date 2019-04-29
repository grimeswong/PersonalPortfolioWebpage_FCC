/*
 * This is an gulf configuration file that setup tasks for automatically run
 * By convention, a default task(s) should be set with a 'default' keyword
 *
 **/

const { src, dest, watch, parallel, series} = require('gulp'); // plugin for task runner
const imagemin = require('gulp-imagemin'); // plugin to minify images
const cleancss = require('gulp-clean-css'); // plugin to minify css
const htmlmin = require('gulp-htmlmin'); // plugin to minify html
const jsmin = require('gulp-uglify'); // plugin to minify javascript
const autoprefixer = require('gulp-autoprefixer'); // plugin for prefixing css
const sass = require('gulp-sass'); // plugin for converting sass/scss to css

/*** Source and destination folders ***/
const srcImg = 'src/img/**/*';  // ** (wildcard) means include all file in current folders and its subfolders
const destImg = 'public/img';
const srcCss = 'src/css/**/*.css';
const srcScss = "src/css/**/*.scss";
const destCss = 'public/css';
const srcHtml = 'src/index.html';
const destHtml = 'public/';
const srcJs = 'src/js/**/*';
const destJs = 'public/js';


function compressimg() {
  return src(srcImg)
    .pipe(imagemin())
    .pipe(dest(destImg))
}

function compresscss() {
  return src(srcCss)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleancss({compatibility: 'ie8'}))   /* option for making compatibable with IE8 */
    .pipe(dest(destCss))
}

function convertsasstocss() {
  return src(srcScss)
    .pipe(sass().on('error', sass.logError))
    return src(srcCss)
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(cleancss({compatibility: 'ie8'}))   /* option for making compatibable with IE8 */
    .pipe(dest(destCss));
}

function compresshtml() {
  return src(srcHtml)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest(destHtml));
    console.log("compress HTML done!!!")
}

function compressjs() {
  return src(srcJs)
    .pipe(jsmin())
    .pipe(dest(destJs));
}

function watchsass() {
  watch([srcScss], convertsasstocss)
  .on('change', (path, stats) => {
    console.log(`Sass files in ${path} are converting to css file ...`);
  });
}

exports.compressimg = compressimg;  // The name of the tasks runner and export it
exports.compresscss = compresscss;
exports.convertsasstocss = convertsasstocss;
exports.compresshtml = compresshtml;
exports.compressjs = compressjs;
exports.watchsass = watchsass;

/* series() - Combines task functions and/or composed operations into larger operations that will be executed one after another, in sequential order.
 * parallel() - Combines task functions and/or composed operations into larger operations that will be executed simultaneously.
 *
 **/

exports.build = series(parallel(compressimg, compressjs, convertsasstocss), compresshtml);  // Define a build task for implementing the minify jobs
exports.default = parallel(watchsass, compressimg, compresshtml, compressjs);  // Defined a default tasks for executing one after another by using the function "series"
