let gulp = require('gulp');

gulp.task('cssCopy', function(){
  return gulp.src('src/**/*.css')
    .pipe( gulp.dest('lib/') );
});