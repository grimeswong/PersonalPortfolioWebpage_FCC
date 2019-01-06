/*
 * This is an gulf configuration file that setup tasks for automatically run
 * By convention, a default task(s) should be set with a 'default' keyword
 *
 **/

const { src, dest, parallel, series} = require('gulp');
const imagemin = require('gulp-imagemin');
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

/*** Source and destination folders ***/
const srcImg = 'src/img/**/*';  // ** (wildcard) means include all file in current folders and its subfolders
const destImg = 'public/img';
const srcCss = 'src/css/**/*.css';
const destCss = 'public/css';


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

exports.compressimg = compressimg;  // The name of the tasks runner and export it
exports.compresscss = compresscss;

/* series() - Combines task functions and/or composed operations into larger operations that will be executed one after another, in sequential order.
 * parallel() - Combines task functions and/or composed operations into larger operations that will be executed simultaneously.
 *
 **/


exports.default = series(compressimg);  // Defined a default tasks for executing one after another by using the function "series"
