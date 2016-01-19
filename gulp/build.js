'use strict';

var gulp    = require('gulp');

gulp.task('build', ['clean'], function () {
    gulp.start(['assets', 'sass']);
});
