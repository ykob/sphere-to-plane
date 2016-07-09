const gulp = require('gulp');

const conf = require('../conf').copy_vendor_script_to_build;

gulp.task('copy-vendor-script-to-build', () => {
  return gulp.src(conf.src)
    .pipe(gulp.dest(conf.dest));
});
