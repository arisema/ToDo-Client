
var
  gulp = require('gulp'),
// gulp utils
  newer = require('gulp-newer'),
  htmlclean = require('gulp-htmlclean'),
  concat = require('gulp-concat'),
  deporder = require('gulp-deporder'),
  stripdebug = require('gulp-strip-debug'),
  coffee = require('gulp-coffee'),
  order = require('gulp-order'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
// browserSync = require('browser-sync'),
  connect = require('gulp-connect'),
// development mode?
  devBuild = (process.env.NODE_ENV == 'production'),
// folders
  folder = {
    src: 'src/',
    build: 'build/'
  }
;

/* ===========
      TASKS
   ===========*/

// server task
gulp.task('webserver', function(){
  connect.server({
    livereload: true,
    root: ['.', '.tmp']
  });
});

// livereload
/*
gulp.task('livereload', function() {
  gulp.src('.tmp/scripts/*.js')
    .pipe(watch())
    .pipe(connect.reload());
});*/

// html tasks
gulp.task('html', function(){
  var
    out = folder.build + 'html/',
    page = gulp.src(folder.src + 'html/**/*')
      .pipe(newer(out))
  ;
  // minify production code
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }
  return page.pipe(gulp.dest(out));
});

// js tasks WITH DEPORDER
gulp.task('jsD', function() {

  var scriptOrder = [
    "src/js/dependencies/angular.min.js",
    "src/js/dependencies/angular-ui-router.js",
    "node_modules/lodash/lodash.min.js",
    "node_modules/restangular/dist/restangular.js",
    "src/js/app.js",
    "src/js/app.config.js",
    "src/js/app.factories.js",
    "src/js/controllers/todoController.js",
    "src/js/controllers/projectController.js",
    "node_modules/material-design-lite/material.min.js"
  ];

  var jsbuild = gulp.src(scriptOrder)
    .pipe(concat('main.js'));

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
      console.log("Not Dev Build");
  }
  console.log("js with deporder");
  return jsbuild.pipe(gulp.dest(folder.build + 'js/'));

});

// js tasks
gulp.task('js', function() {

  var jsbuild = gulp.src(folder.src + 'js/**/*')
    .pipe(deporder())
    .pipe(concat('main.js'));

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }

  return jsbuild.pipe(gulp.dest(folder.build + 'js/'));

});

// css tasks
gulp.task('sass', function(){
  return gulp.src(folder.src+'css/**/*')
  .pipe(sass())
  .pipe(gulp.dest(folder.build + 'css/'))
});

// run all tasks
gulp.task('run', ['html','jsD']);

gulp.task('watch', function() {

  // image changes
  // gulp.watch(folder.src + 'images/**/*', ['images']);

  // html changes
  gulp.watch(folder.src + 'html/**/*', ['html']);

  // javascript changes
  gulp.watch(folder.src + 'js/**/*', [ 'js']);

  // css changes
  gulp.watch(folder.src + 'css/**/*', ['sass']);

});

// default task
gulp.task('default', ['run', 'watch', 'webserver']);
