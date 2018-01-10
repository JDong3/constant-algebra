const gulp = require('gulp')
const babel = require('gulp-babel')
const del = require('del')
const config = {
  presets: ['env']
}

gulp.task('clean', () => (
  del(['dist'])
))

gulp.task('transpileSrc', ['clean'], () => (
  gulp.src('src/*.js')
  .pipe(babel(config))
  .pipe(gulp.dest('dist/src'))
))

gulp.task('transpileEntry', ['clean'], () => (
  gulp.src('index.js')
  .pipe(babel(config))
  .pipe(gulp.dest('dist'))
))

gulp.task('config', ['clean'], () => (
  gulp.src('package.json')
  .pipe(gulp.dest('dist'))
))

gulp.task('build', ['transpileSrc', 'transpileEntry', 'config'], () => (
  undefined
))
