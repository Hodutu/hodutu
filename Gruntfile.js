module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    execute: {
        target: {
            src: ['src/main.js']
        }
    },
    browserify: {
      dist: {
        files: {
          'deploy/laboo.js': ['src/main.js'],
        },
        options: {}
      }
    },

    'http-server': {
      dev: {
        root: 'build',

        port: 1337,
        host: "127.0.0.1",

        cache: 0,
        showDir : true,
        autoIndex: true,
        defaultExt: "html",

        //wait or not for the process to finish
        runInBackground: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-execute');

  //grunt.registerTask('default', ['browserify']);
  grunt.registerTask('default', ['execute']);
  grunt.registerTask('run', ['http-server:dev']);

};
