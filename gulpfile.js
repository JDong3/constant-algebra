const gulp = require('gulp')
const babel = require('gulp-babel')
const del = require('del')
const config = {
  presets: ['env']
}
const nothing = (done) => {done()}

gulp.task('clean', () => (
  del(['dist/**/*'])
))

gulp.task('transpileSrc', () => (
  gulp.src('src/*.js')
    .pipe(babel(config))
    .pipe(gulp.dest('dist/src'))
))

gulp.task('transpileEntry', () => (
  gulp.src('index.js')
    .pipe(babel(config))
    .pipe(gulp.dest('dist'))
))

gulp.task('mvConfig', () => (
  gulp.src('package.json')
    .pipe(gulp.dest('dist'))
))

const buildSeries = (
  gulp.series('clean', 'transpileSrc', 'transpileEntry', 'mvConfig', nothing)
)
gulp.task('build', buildSeries)
