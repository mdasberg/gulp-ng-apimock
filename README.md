# gulp-ng-apimock [![Build Status](https://travis-ci.org/mdasberg/gulp-ng-apimock.svg?branch=master)](https://travis-ci.org/mdasberg/gulp-ng-apimock) [![npm version](https://img.shields.io/node/v/gulp-ng-apimock.svg)](https://github.com/mdasberg/gulp-ng-apimock) [![dependency Status](https://img.shields.io/david/mdasberg/gulp-ng-apimock.svg)](https://david-dm.org/mdasberg/gulp-ng-apimock) [![devDependency Status](https://img.shields.io/david/dev/mdasberg/gulp-ng-apimock.svg)](https://david-dm.org/mdasberg/ggulp-ng-apimock#info=devDependencies) [![npm downloads](https://img.shields.io/npm/dm/gulp-ng-apimock.svg?style=flat-square)](https://www.npmjs.com/package/gulp-ng-apimock)

> Gulp plugin that wraps around [ng-apimock](https://github.com/mdasberg/ng-apimock) which provides the ability to use scenario based api mocking:
 - for local development 
 - for protractor testing
 
## Getting Started
This plugin requires Gulp

If you haven't used [Gulp](http://gulpjs.com/) before, be sure to check out the [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) guide, as it explains how to create a Gulpfile as well as install and use Gulp plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-ng-apimock --save-dev

```

## Usage

```js
const gulp = require('gulp');
const ngApimock = require('gulp-ng-apimock');

gulp.task('ngApimock', function() {
    ngApimock.run({
        src: "test/mocks",
        outputDir: "path/to/outputDir",
        done: function() {
            // async
        }
    });
});

```

This task will process the mock data provided in the configuration and make it accessible for connect as middleware.

### Howto write mocks
see [Howto write mocks]( https://github.com/mdasberg/ng-apimock#howto-write-mocks)

## Howto use global variables
see [Howto use global variables](https://github.com/mdasberg/ng-apimock#howto-use-global-variables)

### Howto serve selected mocks
To be able to use the selected mocks you need to do two things:

1. Add the connect middleware
2. Add the mocking interface to your connect configuration

#### Add the connect middleware
When running gulp-connect you can do add the following middleware block to your configuration

```js
gulp.task('connect', function() {
    var connect = require('gulp-connect');
    connect.server({
        root: "src",
        middleware: function(connect, opt) {
            return [
                (require('ng-apimock/lib/utils').ngApimockRequest),
                // ...
            ]
        }
    });
});
```

When running browser-sync you can do add the following middleware block to your configuration

```js
gulp.task('browser-sync', function() {
    var browserSync = require('browser-sync').create();
    browserSync.init({
        server: {
            baseDir: "src"
        },
        middleware: [
          (require('ng-apimock/lib/utils').ngApimockRequest),
          // ...
        ]
    });
});
```


#### Add the mocking interface to your connect configuration
When running gulp-connect you can do add the following middleware block to your configuration

```js
gulp.task('connect', function() {
    var connect = require('gulp-connect');
    var serveStatic = require('serve-static');
    connect.server({
        root: "src",
        middleware: function(connect, opt) {
            return [
                (require('ng-apimock/lib/utils').ngApimockRequest),
                connect().use('/mocking', serveStatic('path/to/outputDir'))
                // ...
            ]
        }
    });
});
```

When running browser-sync you can do add the following staticServe block to your configuration

```js
gulp.task('browser-sync', function() {
    var browserSync = require('browser-sync').create();
    browserSync.init({
        server: {
            baseDir: "src"
        },
        serveStatic: [{
            route: '/mocking',
            dir: 'path/to/outputDir'
        }],
        middleware: [
          (require('ng-apimock/lib/utils').ngApimockRequest),
          // ...
        ]
    });
});
```

### Howto use for local development
see [Howto use for local development](https://github.com/mdasberg/ng-apimock#howto-use-for-local-development)

### Howto use for your protractor tests.
see [Howto use for your protractor tests](https://github.com/mdasberg/ng-apimock#howto-use-for-your-protractor-tests)

### Available functions
see [Available functions](https://github.com/mdasberg/ng-apimock#available-functions)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Gulp](http://gulpjs.com/).


