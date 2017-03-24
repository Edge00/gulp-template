'use-strict';

const gulp = require('gulp'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  htmlbeautify = require('gulp-html-beautify'),
  fileinclude = require('gulp-file-include'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  browsersync = require('browser-sync');

gulp.task('dev', ['clean', 'sass', 'imagemin', 'concat', 'html'], function(){
  browsersync.init({
    server: {
      baseDir: 'dist'
    }
  })
  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./src/images/*', ['imagemin'])
  gulp.watch('./src/**/*.html', ['html'])
  gulp.watch('./src/js/*.js', ['concat'])
  gulp.watch(['dist/css/*.css', 'dist/*.html', 'dist/js/*.js', 'src/images/*']).on('change', browsersync.reload)
})

gulp.task('html', function(){
  return gulp.src('./src/*.html')
    .pipe(fileinclude('@@'))
    .pipe(htmlbeautify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('sass', function(){
  return gulp.src('./src/sass/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 10 versions']
      }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('concat', function(){
  return gulp.src('./src/js/**/*')
    // .pipe(sourcemaps.init())
    // .pipe(concat('all.js'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('imagemin', function(){
  return gulp.src('./src/images/*')
    .pipe(imagemin({
      optimizationLevel: 3
    }))
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('clean', function(){
  return del('./dist/**/*')
})
