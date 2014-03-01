module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    exec: {
      command : 'open webkitbuilds/releases/hodutu/mac/hodutu.app'
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
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['build', 'run']);
  grunt.registerTask('run', ['exec']);
  grunt.registerTask('build', ['nodewebkit']);

};
