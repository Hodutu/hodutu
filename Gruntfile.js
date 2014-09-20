'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    exec: {
      open: {
        command : 'open webkitbuilds/releases/hodutu/mac/hodutu.app'
      },
      generate_list: {
        command : 'node tools/tvshow-list.js'
      },
      json2nedb: {
        command : 'node tools/json-to-nedb.js'
      },
      dependencies: {
        /*
         * maybe in the future we will need
         * to copy also some dependencies here
         */
      }
    },
    nodewebkit: {
      options: {
          build_dir: './webkitbuilds',
          mac: true, // We want to build it for mac
          win: false, // We want to build it for win
          linux32: false, // We don't need linux32
          linux64: false // We don't need linux64
      },
      src: ['./package.json', './src/**/*'] // Your node-webkit app
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['build', 'run']);
  grunt.registerTask('run', ['exec:open']);
  grunt.registerTask('build', ['nodewebkit']);

  grunt.registerTask('generate-list', ['exec:generate_list']);
  grunt.registerTask('json-to-nedb', ['exec:json2nedb']);

};
