const gulp = require('gulp');

exports.default = gulp.task('default', function () {
  return gulp.src('./src/assets/**/*').pipe(gulp.dest('./dist/assets/'));
});
