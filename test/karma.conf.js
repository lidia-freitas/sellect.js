/**
 * @file
 *
 * ### Responsibilities
 * - configure karma for jasmine testing
 *
 * Scaffolded with generator-microjs v0.1.2
 *
 * @author Lidia Freitas <>
 */

module.exports = function (config) {
    'use strict';

    config.set({
        /*
         Path used to resolve file paths
         */
        basePath: '../',

        files: [
            'src/sellect.css',
            'src/sellect.js',
            'test/spec/**/*.js'
        ],

        // web server port
        port: 8080,

        /*
         Test results reporter to use:
         dots, progress, nyan, story, coverage etc.
         */
        reporters: ['progress', 'dots', 'coverage'],

        /*
         Test pre-processors
         */
        preprocessors: {
            'sellect.js': ['coverage']
        },

        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-jasmine'
        ],

        /*
         Test coverage reporters:
         html, lcovonly, lcov, cobertura, text-summary, text, teamcity, clover etc.
         */
        coverageReporter: {
            reporters: [{
                type: 'text',
                dir: 'test/coverage'
            }, {
                type: 'lcov',
                dir: 'test/coverage'
            }]
        },

        /*
         Locally installed browsers
         Chrome, ChromeCanary, PhantomJS, Firefox, Opera, IE, Safari, iOS etc.
         */
        browsers: ['Chrome', 'ChromeWithoutSecurity'],

        /*
         Enable / disable watching file and executing tests whenever any file changes
         */
        autoWatch: true,

        /*
         Continuous Integration mode: if true, it capture browsers, run tests and exit
         */
        singleRun: true,

        colors: true,

        /*
         Report slow running tests, time in ms
         */
        reportSlowerThan: 250,

        /*
         If browser does not capture in given timeout [ms], kill it
         Increasing timeout in case connection in Travis CI is slow
         */
        captureTimeout: 100000,

        /*
         Logging Level:
         DISABLE, ERROR, WARN, INFO, DEBUG
         */
        logLevel: 'INFO',

        /*
         Test framework to use:
         jasmine, mocha, qunit etc.
         */
        frameworks: ['jasmine'],

        //Uncomment the following lines if you are using grunt's server to run the tests
        proxies: {
            '/': 'http://localhost:9000/'
        },

        //URL root prevent conflicts with the site root
        urlRoot: '_karma_',

        customLaunchers: {
            ChromeWithoutSecurity: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        }
    });
};
