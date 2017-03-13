'use strict';

var gulp = require('gulp'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    rimraf = require('rimraf'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    jscs = require('gulp-jscs'),
    jscsStylish = require('gulp-jscs-stylish'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scss-lint'),
    scssLintStylish = require('gulp-scss-lint-stylish'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    processhtml = require('gulp-processhtml'),
    fs = require('fs'),
    env = require('gulp-env'),
    istanbul = require('gulp-istanbul'),
    ngDocs = require('gulp-ngdocs'),
    cssnano = require('gulp-cssnano'),
	inject = require('gulp-inject'),
    connect = require('gulp-connect');

var exec = require('child_process').exec;

var noValidation = argv.noVal != null;
var isProd = argv.prod || undefined;

// to ignore files/folder use this syntax '!static/js/**/*.js',
var devLibFiles = [
];

var jsFiles = [
    'app/polyfill.js',
    'app/app.constants.js',
    'app/utility/**.utility.js',
    'app/components/**/*.js',
    'app/app.module.js',
    'app/behaviors/**.behavior.js',
    'app/decorators/**.decorator.js',
    'app/services/**.svc.js',
    'app/app.config.js'
];

var scssFiles = [
    'client/style/**/*.scss',
    'app/**/*.scss'
];

var htmlPages = [
    './*.html'
];

var componentHtmlFiles = [
    './client/app/components/**/*.html'
];

var deployFolder = 'deploy';

// rimraf is a rm -rf command to delete a folder recursively
gulp.task('clean', function(cb) {
    rimraf(deployFolder + '/*', cb);
});

gulp.task('jscs', function() {
    gulp.src(jsFiles)
        .pipe(jscs('.jscsrc'))
        .pipe(jscsStylish())
        .on('error', function(err) {
            console.log(err)
        });
});

gulp.task('jshint', function() {
    gulp.src(jsFiles)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', function(err) {
            console.log(err)
        });
});

gulp.task('process-js', noValidation ? null : ['jscs', 'jshint'], function() {
    gulp.src(jsFiles, {base: './'})
        .pipe(gulpif(isProd, concat('main.min.js'), concat('main.js')))
        .pipe(gulpif(isProd, uglify({mangle: true, preserveComments: 'some'})))
        .pipe(gulp.dest(deployFolder + '/js'));
});

gulp.task('process-scss', function() {
    gulp.src(scssFiles)
        .pipe(gulpif(!noValidation, scsslint({config: 'scsslint.yml', customReport: scssLintStylish})))
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulpif(isProd, concat('main.min.css'), concat('main.css')))
        .pipe(gulpif(isProd, cssnano()))
        .pipe(gulp.dest(deployFolder + '/css'));
});

gulp.task('process-html', function() {
    gulp.src(htmlPages)
        .pipe(gulp.dest(deployFolder));

    gulp.src(componentHtmlFiles)
        .pipe(gulp.dest(deployFolder + '/app/components'));
});

gulp.task('deploy-favicons', function() {
    gulp.src('./client/static/favicons/**/*.*')
        .pipe(gulp.dest(deployFolder));
});

gulp.task('deploy-fonts', function() {
    gulp.src('./client/static/fonts/**/*.*', {base: './client/'})
        .pipe(gulp.dest(deployFolder));
});

gulp.task('deploy-images', function() {
    gulp.src('./client/static/images/**/*', {base: './client/'})
        .pipe(gulp.dest(deployFolder));
    gulp.src('./client/static/favicons/**/*')
        .pipe(gulp.dest(deployFolder));
});

gulp.task('deploy-data-files', function() {
    gulp.src('./client/data/*.json')
        .pipe(gulp.dest(deployFolder + '/data'));
    gulp.src('./client/data/i18n/*.json')
        .pipe(gulp.dest(deployFolder + '/data/i18n'));
    gulp.src('./client/data/env/dev-settings.js', {base: './client/'})
        .pipe(rename("env-settings.js"))
        .pipe(gulp.dest(deployFolder + '/data'));
});

gulp.task('index', function () {
	var target = gulp.src('index.html');
	// It's not necessary to read the files (will speed up things), we're only after their paths:
    // TODO: Fix file reading!
    fs.readFile('deploy/css/main.css', function(data) {
        console.log(data);
    });
	var sources = gulp.src([deployFolder + '/css/main.css',
							deployFolder + '/js/main.js'], {read: false});

	return target.pipe(inject(sources))
		.pipe(gulp.dest('./'));
});

gulp.task('webserver', function() {
    connect.server();
});

function runCommand(command) {
    var child = exec(command);
    child.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
        console.log('stdout: ' + data);
    });
}

//gulp.task('build', function() {
//runSequence(
//'clean',
//'process-scss',
//'process-html',
//'deploy-images',
//'deploy-favicons',
//'deploy-fonts',
//'deploy-data-files',
//'index',
//'webserver'
//);
//});

gulp.task('watch', function() {
    gulp.watch(jsFiles, ['process-js']);
    gulp.watch(scssFiles, ['process-scss']);
//    gulp.watch(htmlPages, ['process-html']);
//    gulp.watch('./client/app/**/*.html', ['process-html']);
//    gulp.watch('./server/views/**/*.jade', ['process-jade']);
//    gulp.watch('./static/images/*', ['deploy-images']);
//    gulp.watch('./client/data/**/*', ['deploy-data-files']);
});

gulp.task('build', function() {
    runSequence(
        'process-js',
        'process-scss',
        'webserver'
    );
});

gulp.task('default', function() {
    runSequence(
        'clean',
        'build',
        'watch'
    );
});
