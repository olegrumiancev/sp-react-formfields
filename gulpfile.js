let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');

gulp.task('copyassets', function(){
  gulp.src(['src/**/*.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('lib/'));
  return gulp.src(['src/**/*.json']).pipe(gulp.dest('lib/') );
});