/*jshint globalstrict: true*/
'use strict';


var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var to5 = require('gulp-6to5');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var yuidoc = require('gulp-yuidoc');
var changelog = require('conventional-changelog');
var assign = Object.assign || require('object.assign');
var fs = require('fs');
var bump = require('gulp-bump');
var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');
var imagemin = require('gulp-imagemin');
var tools = require('aurelia-tools');
var protractor = require('gulp-protractor').protractor;
var webdriver_update = require('gulp-protractor').webdriver_update;

var path = {
  source:'src/**/*.js',
  html:'src/**/*.html',
  style:'styles/**/*.css',
  img: 'src/img/**',
  imgOutput: 'dist/img',
  output:'dist/',
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};

var compilerOptions = {
  filename: '',
  filenameRelative: '',
  blacklist: [],
  whitelist: [],
  modules: '',
  sourceMap: true,
  sourceMapName: '',
  sourceFileName: '',
  sourceRoot: '',
  moduleRoot: '',
  moduleIds: false,
  experimental: false,
  format: {
    comments: false,
    compact: false,
    indent: {
      parentheses: true,
      adjustMultilineComment: true,
      style: '  ',
      base: 0
    }
  }
};

var jshintConfig = {esnext:true};

gulp.task('clean', function() {
 return gulp.src([path.output])
    .pipe(vinylPaths(del));
});

// Run node server, watch for server-side changes and restart when they happen
gulp.task('nodemon', function () {
  nodemon(
    {
      script: './server.js',
      ext: 'js,json',
      nodeArgs: ['--debug']
    });
});


gulp.task('build-system', function () {
  return gulp.src(path.source)
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.js'}))
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(gulp.dest(path.output))
    .pipe(livereload());
});

gulp.task('build-html', function () {
  return gulp.src(path.html)
    .pipe(changed(path.output, {extension: '.html'}))
    .pipe(gulp.dest(path.output))
    .pipe(livereload());
});

gulp.task('lint', function() {
  return gulp.src(path.source)
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish));
});

gulp.task('images', function() {
  return gulp.src(path.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.imgOutput));
});

gulp.task('doc-generate', function(){
  return gulp.src(path.source)
    .pipe(yuidoc.parser(null, 'api.json'))
    .pipe(gulp.dest(path.doc));
});

gulp.task('doc', ['doc-generate'], function(){
  tools.transformAPIModel(path.doc);
});

gulp.task('bump-version', function(){
  return gulp.src(['./package.json'])
    .pipe(bump({type:'patch'})) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

gulp.task('changelog', function(callback) {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return changelog({
    repository: pkg.repository.url,
    version: pkg.version,
    file: path.doc + '/CHANGELOG.md'
  }, function(err, log) {
    fs.writeFileSync(path.doc + '/CHANGELOG.md', log);
  });
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'images'],
    callback
  );
});

gulp.task('webdriver_update', webdriver_update);

gulp.task('build-e2e', function () {
  return gulp.src(path.e2eSpecsSrc)
    .pipe(plumber())
    .pipe(to5())
    .pipe(gulp.dest(path.e2eSpecsDist));
});

gulp.task('e2e', ['webdriver_update', 'build-e2e'], function(cb) {
  return gulp.src(path.e2eSpecsDist + '/*.js')
  .pipe(protractor({
      configFile: 'protractor.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:9000']
  }))
  .on('error', function(e) { throw e; });
});

gulp.task('update-own-deps', function(){
  tools.updateOwnDependenciesFromLocalRepositories();
});

gulp.task('build-dev-env', function () {
  tools.buildDevEnv();
});

gulp.task('serve', ['build', 'nodemon']);


function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  livereload();
}

gulp.task('watch', ['serve'], function() {
  livereload.listen();
  gulp.watch(path.source, ['build-system', livereload]).on('change', reportChange);
  gulp.watch(path.html, ['build-html', livereload]).on('change', reportChange);
  gulp.watch(path.style, livereload).on('change', reportChange);
});

gulp.task('prepare-release', function(callback){
  return runSequence(
    'build',
    'lint',
    'bump-version',
    'doc',
    'changelog',
    callback
  );
});