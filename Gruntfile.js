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
          if(src.indexOf('_wide') < 0){
          return dest + src.replace('.html', '_wide.html');
          }else{
            return dest + src;
        }
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
      },
      deploy: {
        expand: true,
        flatten: true,
        src: './dist/*',
        dest: './prod'
      }
    }
  });

  grunt.registerTask('default', ['dist']);
  grunt.registerTask('dist', ['dist:copy']);
  grunt.registerTask('deploy', ['dist', 'diffCopy:deploy']);
  grunt.registerTask('dist:copy', [
    'newer:copy:templates',
    'newer:copy:templates_wide',
    'newer:copy:assets',
    'newer:copy:fonts',
    'newer:copy:styles'
  ]);

};