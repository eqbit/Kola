const {src, dest, watch, parallel, series} = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const browsersync = require("browser-sync").create();

const browserSync = done => {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
};

const browserSyncReload = done => {
  browsersync.reload();
  done();
};

const scripts = () => {
  return src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [['@babel/preset-env']]
    }))
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'))
    .pipe(browsersync.stream());
  
};

const styles = () => {
  return src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css'))
    .pipe(browsersync.stream());
};

const watcher = () => {
  watch('src/js/*.js', scripts);
  watch('src/scss/**/*.scss', styles);
  watch('index.html', browserSyncReload);
};

exports.js = scripts;
exports.css = styles;
exports.watch = parallel(watcher, browserSync);
exports.start = exports.watch;