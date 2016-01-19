/**
 * Gulp Configurations
 * @type {Object}
 */

var path = {
	src: './public/src/app',
	dist: './public/dist/app'
};

path.allJs = [
    path.src + '/*.js',
    path.src + '/js/*.js',
    path.src + '/js/**/*.js'
];

var webpack = {
    cache: true,
    debug: true
};

module.exports = {
    webpack: webpack,
    path: path
};
