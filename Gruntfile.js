module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
       dist: {
          options: {
             banner: '/*! by Vlad Kampov */\n/*https://github.com/vladkampov/backbone-example */\n'
          },
          files: {
             'js/app.min.js': ['src/js/app.js'],
          }
       }
    },
    cssmin: {
       dist: {
          options: {
             banner: '/*! by Vlad Kampov */\n/*https://github.com/vladkampov/backbone-example */\n'
          },
          files: {
             'css/style.min.css': ['src/css/*.css']
          }
      }
    },
    copy: {
      backbone: {
        expand: true,
        cwd: 'node_modules/backbone/',
        src: 'backbone-min.js',
        dest: 'js/',
      },
      bootstrapjs: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/js',
        src: 'bootstrap.min.js',
        dest: 'js/',
      },
      bootstrapcss: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/css',
        src: 'bootstrap.min.css',
        dest: 'css/',
      },
      localStorage: {
        expand: true,
        cwd: 'node_modules/backbone.localstorage/',
        src: 'backbone.localStorage-min.js',
        dest: 'js/',
      },
      underscore: {
        expand: true,
        cwd: 'node_modules/underscore/',
        src: 'underscore-min.js',
        dest: 'js/',
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist/',
        src: 'jquery.min.js',
        dest: 'js/',
      },
      qunit: {
        expand: true,
        cwd: 'node_modules/qunitjs/qunit/',
        src: 'qunit.js',
        dest: 'qunit/',
      },
      qunitcss: {
        expand: true,
        cwd: 'node_modules/qunitjs/qunit/',
        src: 'qunit.css',
        dest: 'qunit/',
      },
      sinonjs: {
        expand: true,
        cwd: 'node_modules/sinon/lib/',
        src: 'sinon.js',
        dest: 'qunit/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);
};