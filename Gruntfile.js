var path = require('path'),
    fs = require('fs'),
    os = require('os');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var rjs = os.platform() === 'win32' ? 'r.js.cmd' : 'r.js',
      npm = os.platform() === 'win32' ? 'npm.cmd' : 'npm';

  var assets = {};

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      templates: {
        expand: true,
        src: [
          './src/templates/*.liquid',
          './src/templates/**/*.liquid'
        ],
        dest: './dist/',
        rename: function(dest, src){
          var components = src.split('/');
          components.splice(0, 3);
          return dest + components.join('').replace(/\.liquid$/, '.html');
        }
      },
      templates_wide: {
        expand: true,
        flatten: true,
        cwd: './dist/',
        src: ['pages_show_*', 'user_sessions_*'],
        dest: './dist/',
        rename: function(dest, src){
          return dest + src.replace('.html', '_wide.html');
        }
      },
      assets: {
        expand: true,
        flatten: true,
        src: [
          './src/assets/*',
          './src/assets/**/*'
        ],
        dest: './dist/'
      },
      fonts: {
        expand: true,
        flatten: true,
        src: [
          './src/fonts/*',
          './src/fonts/**/*'
        ],
        dest: './dist/'
      },
      styles: {
        expand: true,
        flatten: true,
        src: [
          './src/styles/*',
          './src/styles/**/*'
        ],
        dest: './dist/'
      }
    }
  });

  grunt.registerTask('default', ['dist']);
  grunt.registerTask('dist', ['dist:copy']);
  grunt.registerTask('dist:copy', ['copy:templates', 'copy:templates_wide', 'copy:assets', 'copy:fonts', 'copy:styles']);

};