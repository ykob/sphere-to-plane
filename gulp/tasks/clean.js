const gulp = require('gulp');
const del = require('del');

const conf = require('../conf').clean;

gulp.task('clean', cb => {
  del(conf.path).then(() => {
    cb();
  });
});
