
module.exports = function(grunt){

	grunt.initConfig({
		// Basic settings and info about our plugins
		pkg: grunt.file.readJSON('package.json'),
		// minify css
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'html/css',
		      src: ['*.css', '!*.min.css'],
		      dest: 'html/css',
		      ext: '.min.css'
		    }]
		  }
		},
		///uglify js
		uglify: {
			dist:{
				files: {
					'html/js/app.min.js': ['html/js/app.js']
				}
			}
		},
		imagemin: {
		   dist: {
		      options: {
		        optimizationLevel: 5
		      },
		      files: [{
		         expand: true,
		         cwd: 'html/images',
		         src: ['*.{png,jpg,gif}'],
		         dest: 'html/images'
		      }]
		   }
		}
	});
	//load the plugin
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	//Do the task
    grunt.registerTask('default', ['cssmin', 'uglify']);

};