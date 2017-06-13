import gulp from 'gulp';
import uglify from 'gulp-uglify';
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import babelify from "babelify";
import deumdify from 'deumdify';
import autoprefixer from "gulp-autoprefixer";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import del from "del";
// import path from 'path';

const destPath = "./deploy";
const cssminConfig = {
  compatibility: "ie6,ie7,ie8,+selectors.ie7Hack,+properties.iePrefixHack",
  roundingPrecision: -1,
  processImport: false
};
export function script() {
  var b = browserify({
      standalone: "btWebLogin",
      entries: './src/index.es6',
      debug: false
    })
    .plugin(deumdify)
    .transform(babelify, {
      compact: "true"
    });
  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest(destPath));
}
export function resource() {
  return gulp.src("./src/**/*.{png,jpg,gif}").pipe(gulp.dest(destPath));
}
export function style() {
  var _pipe = gulp.src("./src/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
          includePaths: ['./src/style/lib/']
        }
        /*{
               sourcemap: needsassSourcemap,
               emitCompileError: needEmittingSassError
             }*/
      )
    )
    .pipe(autoprefixer({
      browsers: ['> 1%', 'IE 6-8']
    }));

  if (!process.env.prod) {
    _pipe = _pipe.pipe(sourcemaps.write());
  }
  // if (process.env.prod) {
  //   _pipe = _pipe.pipe(cssmin(cssminConfig));
  // }

  return _pipe.pipe(gulp.dest(destPath));
}

export function watch() {
  // livereload.listen();
  gulp.watch(["./src/**/*.es6"], script);
  gulp.watch(["./src/**/*.scss"], style);
}

export function clear() {
  return del(['deploy/*']);
}

const build_watch = gulp.series(script, style, watch);

const build = gulp.series(clear, gulp.parallel(script, style), resource);


export {

  build,
  build_watch,
};



export default build;