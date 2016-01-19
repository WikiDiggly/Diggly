'use strict';

var gulp        = require('gulp');
var webpack     = require('webpack');
var config      = require('./config');
var stream      = require('webpack-stream');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');

// Webpack bundles JS files
gulp.task('webpack', function () {
    return gulp.src(config.path.allJs)
        .pipe(sourcemaps.init())
        .pipe(stream(config.webpack))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.path.dist));
});
