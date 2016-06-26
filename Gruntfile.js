
module.exports = function(grunt){

	grunt.initConfig({
		// Basic settings and info about our plugins
		pkg: grunt.file.readJSON('package.json'),
		// minify css
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'src/css',
		      src: ['*.css', '!*.min.css'],
		      dest: 'dist/css',
		      ext: '.min.css'
		    },
		    {
		      expand: true,
		      cwd: 'src/css',
		      src: ['*.css', '!*.min.css'],
		      dest: 'src/css',
		      ext: '.min.css'
		    }
		    ]
		  }
		},
		///uglify js
		uglify: {
			dist:{
				files:[{
					'dist/js/app.min.js': ['src/js/app.js']
				},
				{
					'src/js/app.min.js': ['src/js/app.js']
				}
				]
			}
		},
		imagemin: {
		   dist: {
		      options: {
		        optimizationLevel: 5
		      },
		      files: [{
		         expand: true,
		         cwd: 'src/images',
		         src: ['*.{png,jpg,gif}'],
		         dest: 'dist/images'
		      }]
		   }
		},
		htmlmin: {                                     // Task 
		  dist: {                                      // Target 
		    options: {                                 // Target options 
		      collapseWhitespace: true
		    },
		    files: {                                   // Dictionary of files 
		      'dist/index.html': 'src/index.html'     // 'destination': 'source' 
		    }
		  },
		},
		copy: {
		  main: {
		    files: [
		      // includes files within path 
		      {expand: true, cwd: 'src/bootstrap', src: ['**'], dest: 'dist/bootstrap'},
		      {expand: true, cwd: 'src/images', src: ['**'], dest: 'dist/images'},
		      {expand: true, cwd: 'src/index.html', src: ['**'], dest: 'dist/'},
		      {expand: true, cwd: 'src/js/lib', src: ['**'], dest: 'dist/js/lib'},
		      {expand: true, cwd: 'src/js/jquery.js', src: ['**'], dest: 'dist/js'}
		    ],
		  },
		},
	});
	//load the plugin
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	//Do the task
    grunt.registerTask('default', ['cssmin', 'uglify', 'htmlmin', 'copy']);

};