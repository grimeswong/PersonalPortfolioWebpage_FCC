/*
 * This is an gulf configuration file that setup tasks for automatically run
 * By convention, a default task(s) should be set with a 'default' keyword
 *
 **/

const { src, dest, parallel, series} = require('gulp');
const imagemin = require('gulp-imagemin');


/*** Source and destination folders ***/
const srcImg = 'src/img/**/*';  // ** (wildcard) means include all file in current folders and its subfolders
const destImg = 'public/img'


function compressimg() {
  return src(srcImg)
    .pipe(imagemin())
    .pipe(dest(destImg))
}

exports.compressimg = compressimg;  // The name of the tasks runner and export it

/* series() - Combines task functions and/or composed operations into larger operations that will be executed one after another, in sequential order.
 * parallel() - Combines task functions and/or composed operations into larger operations that will be executed simultaneously.
 *
 **/


exports.default = series(compressimg);  // Defined a default tasks for executing one after another by using the function "series"
