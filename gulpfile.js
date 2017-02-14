(function() {
    /*
     * gulp-ng-apimock
     * https://github.com/mdasberg/gulp-ng-apimock
     *
     * Copyright (c) 2017 Mischa Dasberg
     * Licensed under the MIT license.
     */

    'use strict';
    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var ngApimock = require('./tasks/ngApimock');

    // define tasks here
    gulp.task('default', []);

    gulp.task('use-browser-sync', ['ngApimock', 'browser-sync']);
    gulp.task('use-connect', ['ngApimock', 'connect']);

    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: "src"
            },
            serveStatic: [{
                route: '/mocking',
                dir: '.tmp/mocking'
            }],
            middleware: [
                require('ng-apimock/lib/utils').ngApimockRequest,
            ]
        });
    });

    gulp.task('connect', function() {
        var connect = require('gulp-connect');
        var serveStatic = require('serve-static');
        connect.server({
            root: "src",
            middleware: function(connect, opt) {
                return [
                    (require('ng-apimock/lib/utils').ngApimockRequest),
                    connect().use('/mocking', serveStatic('.tmp/mocking'))
                    // ...
                ]
            }
        });
    });

    gulp.task('ngApimock', function() {
        ngApimock.run({
            src: "test/mocks",
            outputDir: ".tmp/mocking",
            done: function() {
                // async
            }
        });
    });
})();

