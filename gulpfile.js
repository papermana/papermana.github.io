'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const paths = {
  src: {
    sass: './sass/**/*.scss',
    js: './js-dev/*.js',
  },
};

const devTasks = [];
const productionTasks = [];

function createTask(name, category, callback, watchPath) {
  name += ':' + category;

  gulp.task(name, callback);

  if (category === 'dev') {
    devTasks.push(name);
  }
  else if (category === 'production') {
    productionTasks.push(name);
  }

  if (watchPath) {
    name += ':watch';

    gulp.task(name, () => {
      return gulp.watch(watchPath, [name]);
    });

    if (category === 'dev') {
      devTasks.push(name);
    }
    else if (category === 'production') {
      productionTasks.push(name);
    }
  }
}


createTask('sass', 'dev', () => {
  return gulp.src(paths.src.sass)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('.'));
}, paths.src.sass);

createTask('copyJS', 'dev', () => {
  return gulp.src(paths.src.js)
  .pipe(gulp.dest('.'));
}, paths.src.js);


createTask('sass', 'production', () => {
  return gulp.src(paths.src.sass)
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCss())
  .pipe(gulp.dest('.'));
});

createTask('transpileJS', 'production', () => {
  return gulp.src(paths.src.js)
  .pipe(babel({
    presets: ['es2015'],
  }))
  .pipe(uglify())
  .pipe(gulp.dest('.'));
});


gulp.task('dev', devTasks);
gulp.task('production', productionTasks);
