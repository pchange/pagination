module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      basic_and_extras: {
        files: {
          // './js/pagination.min.js': ['./js/pagination.js']
        },
      }
    },
    uglify: {
      my_target: {
        files: {
          './js/pagination.min.js': ['./js/pagination.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};