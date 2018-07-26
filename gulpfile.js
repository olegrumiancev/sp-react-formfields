let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');

gulp.task('copyassets', function(){
  return gulp.src(['src/**/*.css', 'src/**/*.json'])
    .pipe(cleanCSS())
    .pipe(gulp.dest('lib/') );
});