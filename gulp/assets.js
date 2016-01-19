'use strict';

var path    = require('path');
var gulp    = require('gulp');
var config  = require('./config');

gulp.task('assets', function () {
    return gulp.src(path.join(config.path.src, '/**/*.{png,svg,jpg}'))
        .pipe(gulp.dest(config.path.dist));
});
