(function () {
    'use strict';

    var gulp = require('gulp'),
        jshint = require('gulp-jshint');

    gulp.task('jshint', function () {
        gulp.src(['gulpfile.js', 'tasks/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });
})();