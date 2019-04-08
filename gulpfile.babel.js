'use strict'

import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import gif from 'gulp-if'
import autoprefixer from 'gulp-autoprefixer'
import sass from 'gulp-sass'
import del from 'del'

const liveEnv = process.argv.indexOf('--live') !== -1

function handleError (err) {
  console.log(err.toString())
  this.emit('end')
}

export function css () {
  return gulp
    .src('./src/main.scss')
    .pipe(plumber({ errorHandler: handleError }))
    .pipe(gif(!liveEnv, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'safari 8',
        'ie 11',
        'opera 12.1',
        'ios 6',
        'android 4'
      ]
    }))
    .pipe(gif(!liveEnv, sourcemaps.write()))
    .pipe(gulp.dest('./dist/'))
}

export function clean () {
  return del(['dist'])
}

export function watch () {
  gulp.watch('./src/**/*.scss', css)
}

function build (done) {
  return gulp.series(
    'css'
  )(done)
}

export default build
