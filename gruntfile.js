/**
 * @file
 *
 * ### Responsibilities
 * - automate common tasks using grunt
 *
 * Scaffolded with generator-microjs v0.1.2
 *
 * @author Lidia Freitas <lidiafreitas.me@gmail.com>
 */
'use strict';

module.exports = function (grunt) {
    var config = {
        app: './src',
        dist: './dist'
    };

    /* eslint-disable global-require */
    require('jit-grunt')(grunt);
    /* eslint-enable global-require */

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
            '<%= config.dist %>/'
        ],
        uglify: {
            default: {
                files: {
                    '<%= config.dist %>/sellect.min.js': ['<%= config.app %>/sellect.js']
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
                    '<%= config.dist %>/sellect.min.css': ['<%= config.app %>/sellect.css']
                }
            }
        },
        copy: {
            main: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: '<%= config.app %>/*',
                dest: '<%= config.dist %>/'
            }
        }
    });

    grunt.registerTask('test', [
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'uglify',
        'cssmin',
        'copy'
    ]);

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'test',
        'build'
    ]);
};
