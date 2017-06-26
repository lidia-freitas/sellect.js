/**
 * @file
 *
 * ### Responsibilities
 * - automate common tasks using grunt
 *
 * Scaffolded with generator-microjs v0.1.2
 *
 * @author Lidia Freitas <>
 */
'use strict';

module.exports = function (grunt) {
    var config = {
        app: '.',
        dist: '.'
    };

    require('jit-grunt')(grunt);

    grunt.initConfig({
        config: config,
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'gruntfile.js',
                '<%= config.app %>/{,*/}*.js',
                'test/spec/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },
        clean: [
            'dist/'
        ],
        uglify: {
            default: {
                files: {
                    'dist/sellect.min.js': ['sellect.js']
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/sellect.min.css': ['sellect.css']
                }
            }
        }
    });



    grunt.registerTask('test', [
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'uglify',
        'cssmin'
    ]);

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'test',
        'build'
    ]);
};
