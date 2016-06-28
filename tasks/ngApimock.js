(function () {
    'use strict';

    /*
     * gulp-ng-apimock
     * https://github.com/mdasberg/gulp-ng-apimock
     *
     * Copyright (c) 2016 Frank Merema and contributors
     * Licensed under the MIT license.
     */

    module.exports = function (gulp) {

        /** Ng apimock. */
        gulp.task('ngApimock', function () {
            var configuration = {
                src: "test/mocks"
            };
            require('ng-apimock')().run(configuration);
        });
    };
})();