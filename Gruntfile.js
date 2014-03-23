module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      src: ['src/*.js', 'src/*/*.js']
    },
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
    nodewebkit: {
      options: {
          build_dir: './webkitbuilds', // Where the build version of my node-webkit app is saved
          mac: true, // We want to build it for mac
          win: false, // We want to build it for win
          linux32: false, // We don't need linux32
          linux64: false // We don't need linux64
      },
      src: ['./package.json', './src/**/*'] // Your node-webkit app
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  //grunt.registerTask('default', ['browserify']);
  grunt.registerTask('default', ['jslint', 'execute']);
  grunt.registerTask('build', ['nodewebkit']);
  grunt.registerTask('run', ['http-server:dev']);

};
