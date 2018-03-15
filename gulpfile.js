//#region imports
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sizereport = require('gulp-sizereport');
const check = require('gulp-check');
const rename = require("gulp-rename");
const es = require('event-stream');
const ts = require("gulp-typescript");
const minify = require("gulp-babel-minify");
//#endregion imports

//#region tasks

/**
 * build the src
 */
gulp.task('build', () =>
  es.merge([
    compileSRC(process.env.NODE_ENV),
    resourceSRC()
  ])
  .pipe(sizereport())
  .pipe(gulp.dest(compiledfolder))
);


//#endregion

//#region declare variables
const tsProject = ts.createProject("tsconfig.json");
const srcfolder = './src';
const assetsfolder = `${srcfolder}/assets/**`;
const configfolder = `${srcfolder}/config/**`;
const packagejson = `./package.json`;
const compiledfolder = './js';
//#endregion variavels

//#region compile

/**
 * Apply the eslint
 */
const lint = () => eslint()
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
/**
 * Transpile the src .ts(or what is defined in tsconfig.json) to .js
 *
 * @param {('development'|'test'|'production')} [env='development'] enviroument of to execute the build
 * @returns {stream} js files compiled stream
 */
const compileSRC = (env='development') => {

  let jsFiles = tsProject
    .src()
    .pipe(lint())
    .pipe(tsProject())
    .js;

  jsFiles
    .pipe(check(/(console\.(log|info|error|trace))|debugger/)).on('error', err => gutil.log(gutil.colors.red(err)))

  if ( env === 'production' ) {
    jsFiles = jsFiles
      // check if have console.* or debugger
      .pipe(minify({
        mangle: {
          keepClassName: true
        }
      }));
  }

  return jsFiles;
};
/**
 * Prepare the assets and config files to execute
 *
 */
const resourceSRC = () => es.merge([
  gulp.src(configfolder).pipe(rename(path => (path.dirname = './config'))),
  gulp.src(assetsfolder).pipe(rename(path => (path.dirname = './assets'))),
  gulp.src(packagejson)
]);
//#endregion
