'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var minifyCss   = require('gulp-cssnano');
var rename      = require('gulp-rename');
var path        = require('path');
var config      = require('./config');

gulp.task('sass', function () {
    return gulp.src(path.join(config.path.src, '/styles/master.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(path.join(config.path.dist, '/styles')));
});
