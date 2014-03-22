module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
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

  grunt.registerTask('default', ['browserify']);
  grunt.registerTask('run', ['http-server:dev']);

};
