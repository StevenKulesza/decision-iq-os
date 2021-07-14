var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var htmlreplace = require('gulp-html-replace');
var zip = require('gulp-zip');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var glob = require('glob');
var i = 0;

var parentFolder = '';

/** Configuration **/
var connection = {
  user: 'MQMOXUSE2KOHLSFEEDWAPP\\$MQMOXUSE2KOHLSFEEDWAPP',
  password: 'QSHrDKJiohnxpYi0u2NiYtygzaarxNHaDjK5qJEj6vuKr7sqXrkvG7Xsr3xL',
  host: 'waws-prod-bn1-029.ftp.azurewebsites.windows.net',
  port: 21,
  localFiles: ['./wwwroot/*.json', './wwwroot/images/**/*'],
  remoteDest: '/site/'
};

// parent folder
var sizeFolder = glob.sync('*/', {
  'ignore': ['wwwroot']
});

// paths
var scripts = {
  utils: 'src/scripts/utils.js',
  getFeed: 'src/scripts/getFeed.js',
  buildAssets: 'src/scripts/buildAssets.js',
  setAssets: 'src/scripts/setAssets.js',
  animateAd: 'src/scripts/animateAd.js'
};

var css = {
  reset: 'src/css/reset.css',
  utils: 'src/css/utils.css',
  banner: 'src/css/banner.css'
};

var html = 'src/*.html';

var dest = 'richload';

gulp.task('imagemin', function () {
  return gulp
    .src(connection.localFiles[1])
    .pipe(imagemin({
      verbose: true
    }))
    .pipe(gulp.dest('./wwwroot/images'));
});

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {
  return ftp.create({
    host: connection.host,
    port: connection.port,
    user: connection.user,
    password: connection.password,
    parallel: 5,
    log: gutil.log
  });
}

gulp.task('ftps', function () {
  var conn = getFtpConnection();
  return gulp
    .src(connection.localFiles, {
      base: '.',
      buffer: false
    })
    // only upload newer files
    .pipe(conn.newer(connection.remoteDest))
    .pipe(conn.dest(connection.remoteDest));
});

gulp.task('dev', gulp.series(['imagemin', 'ftps']));

gulp.task('scripts', function () {
  return gulp.src([
      parentFolder + scripts.utils,
      parentFolder + scripts.getFeed,
      parentFolder + scripts.buildAssets,
      parentFolder + scripts.setAssets,
      parentFolder + scripts.animateAd
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(parentFolder + dest));
});

gulp.task('css', function () {
  return gulp.src([
      parentFolder + css.reset,
      parentFolder + css.utils,
      parentFolder + css.banner
    ])
    .pipe(concat('styles.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(parentFolder + dest));
});

gulp.task('html', function () {
  return gulp.src(parentFolder + html)
    .pipe(htmlreplace({
      'css': 'styles.css',
      'js': 'main.js',
      'no-api': ''
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(parentFolder + dest));
});

gulp.task('zip', function () {
  return gulp.src(parentFolder + 'richload/*')
    .pipe(zip('richload.zip'))
    .pipe(gulp.dest(parentFolder + dest));
});

gulp.task('default', gulp.series(function (done) {
  processFiles();
  done();
}, gulp.series(['imagemin', 'ftps'])));

function processFiles() {
  gulp.series(gulp.parallel(function (done) {
    parentFolder = sizeFolder[i];
    done();
  }, gulp.series(gulp.parallel(['scripts', 'css', 'html']), 'zip')), function (done) {
    i++;
    if (sizeFolder[i]) {
      processFiles();
    }
    done();
  })();
}
