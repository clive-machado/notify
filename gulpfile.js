/**
 * Gulp package and its dependencies required to automate tedious tasks 
*/
var gulp 					= require('gulp')
var source 				= require('vinyl-source-stream')
var browserify 		= require('browserify')
var streamify 		= require('gulp-streamify')

/**
 * Automates the task of browserifying individual js files constantly
 * @param  string   	browserify		Name of the task
 * @param  Function 	function      callback
 */
gulp.task('browserify', function () {	
	
	var indexPath = 'public/'
	
	/**
	 * This function builds a bundle.js file
	 */
	var syncBundle = () => {
		browserify(indexPath + 'index.js').bundle()
  	.pipe(source('bundle.js'))
  	.pipe(gulp.dest(indexPath))
	}

	/**
	 * Watches for code changes
	 */
	gulp.watch(indexPath + 'index.js', function () {
		syncBundle()
	})
	syncBundle()
})

gulp.task('default', ['browserify'])