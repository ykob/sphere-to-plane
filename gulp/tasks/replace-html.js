const gulp = require('gulp');

const $ = require('../plugins');
const conf = require('../conf').replace_html;

gulp.task('replace-html', () => {
  return gulp.src(conf.src)
    .pipe($.replace(/(src="\.\/js\/)([a-z0-9]*)(\.js")/g, '$1$2.min$3'))
    .pipe($.replace(/(href="\.\/css\/)([a-z0-9]*)(\.css")/g, '$1$2.min$3'))
    .pipe(gulp.dest(conf.dest));
});
