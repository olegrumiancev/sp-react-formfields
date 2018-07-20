let gulp = require('gulp');

gulp.task('copyassets', function(){
  return gulp.src(['src/**/*.css', 'src/**/*.json'])
    .pipe(gulp.dest('lib/') );
});