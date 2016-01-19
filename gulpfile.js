/**
 * Diggly Gulp File
 * Refer to Gulp Directory of associated Gulp task
 */
'use strict';

var gulp    = require('gulp');
var wrench  = require('wrench');

/**
 * Recursively look through gulp directory and require
 * all associated files
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});

gulp.task('default', ['serve']);
