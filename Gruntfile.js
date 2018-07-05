module.exports = function(grunt) {

  var sassStyle = 'expanded';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      output : {
        options: {
          style: sassStyle
        },
        files: {
          './src/css/index.css': './src/scss/index.scss',
          './src/css/detail.css': './src/scss/detail.scss',
          './src/css/aftersale.css': './src/scss/aftersale.scss'
        }
      }
    },
    // concat: {
    //   dist: {
    //     src: ['./src/js/plugin.js', './src/js/plugin2.js'],
    //     dest: './src/js/index.js',
    //   },
    // },
    uglify: {
      compressjs: {
        files: {
          './src/js/index.min.js': ['./src/js/index.js'],
          './src/js/detail.min.js': ['./src/js/detail.js'],
          './src/js/aftersale.min.js': ['./src/js/aftersale.js'],
        }
      }
    },
    cssmin: { 
         options: {  
             keepSpecialComments: 0  
         },  
         compresscss: {  
             files: {  
                 './src/css/index.min.css': ["./src/css/index.css"],  
                 './src/css/detail.min.css': ["./src/css/detail.css"],  
                 './src/css/aftersale.min.css': ["./src/css/aftersale.css"],  
             }  
         }  
     },  
    // jshint: {
    //   all: ['./src/js/index.js']
    // },
    watch: {
      scripts: {
        // files: ['./src/js/index.js','./src/js/plugin2.js'],
        files: ['./src/js/index.js', './src/js/detail.js', './src/js/aftersale.js'],
        // tasks: ['concat','jshint','uglify']
        tasks: ['uglify']
      },
      sass: {
        files: ['./src/scss/index.scss', './src/scss/detail.scss', './src/scss/aftersale.scss'],
        tasks: ['sass']
      },
      // cssmin: {
      //   files: ["./src/css/index.css", "./src/css/detail.css"], 
      //   tasks: ['cssmin']
      // },
      livereload: {
          options: {
              livereload: '<%= connect.options.livereload %>'
          },
          files: [
              './src/index.html',
              './src/detail.html',
              './src/aftersale.html',
              './src/css/index.css',
              './src/css/detial.css',
              './src/css/aftersale.css',
              './src/js/index.min.js',
              './src/js/detail.min.js',
              './src/js/aftersale.min.js',
          ]
      }
    },
    connect: {
      options: {
          port: 9000,
          open: true,
          livereload: 35729,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: '192.168.3.122'
      },
      server: {
        options: {
          port: 9001,
          base: './src/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin'); 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('outputcss',['sass']);
  // grunt.registerTask('concatjs',['concat']);
  // grunt.registerTask('compressjs',['concat','jshint','uglify']);
  grunt.registerTask('compressjs',['uglify']);
  grunt.registerTask('compresscss',['cssmin']);
  // grunt.registerTask('watchit',['sass','concat','jshint','uglify','connect','watch']);
  grunt.registerTask('watchit', ['sass', 'cssmin', 'uglify','connect','watch']);
  grunt.registerTask('default');

};
