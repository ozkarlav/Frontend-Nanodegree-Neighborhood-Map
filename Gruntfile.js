
module.exports = function(grunt){

	grunt.initConfig({
		// Basic settings and info about our plugins
		pkg: grunt.file.readJSON('package.json'),

		cssmin: {
			combine:{
				files: {
					'html/css/main.css': ['html/css/stylesheet.css', 'html/css/header.css' ]
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['cssmin']);

};