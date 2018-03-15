var gulp = require("gulp");
var bs = require('browser-sync').create(); // create a browser sync instance.

gulp.task('build', function() {

    bs.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("app/*").on('change', bs.reload);

});