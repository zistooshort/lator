console.log('Starting...');
console.time('Require Modules');
var gulp = require('gulp');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var minify = require('gulp-minify');
var header = require('gulp-header');
var less = require('gulp-less');
var clean = require('gulp-clean-css');
var favicon = require('gulp-real-favicon');
var fs = require('fs');
console.timeEnd('Require Modules');
console.time('Tasks');
var files = [
    "src/gba/js/util.js",
    "src/gba/js/controller.js",
    "src/gba/js/core.js",
    "src/gba/js/arm.js",
    "src/gba/js/thumb.js",
    "src/gba/js/mmu.js",
    "src/gba/js/io.js",
    "src/gba/js/audio.js",
    "src/gba/js/video.js",
    "src/gba/js/video/proxy.js",
    "src/gba/js/video/software.js",
    "src/gba/js/irq.js",
    "src/gba/js/keypad.js",
    "src/gba/js/sio.js",
    "src/gba/js/savedata.js",
    "src/gba/js/gpio.js",
    "src/gba/js/gba.js",
    "src/gba/js/xhr.js",
    "tmp/output.js"
];

var built = [
    '// Built: <%= date %>',
    'var iGBAKitTimestamp = new Date(\'<%= date %>\');',
    '// Built: <%= date %>',
    'var iEmuKitTimestamp = new Date(\'<%= date %>\');',
    ''].join('\n');

gulp.task('default', ['js', 'css', 'inject-favicons'], function () {
    return gulp.src(['./src/notices.js', './src/f7/framework7.min.js', './tmp/igbakit-init-min.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./app/'))
});

gulp.task('js', ['ts'], function() {
    return gulp.src(files)
        .pipe(concat('igbakit-init.js'))
        .pipe(minify())
        .pipe(header(built, {
            date: new Date().toString()
        }))
        .pipe(gulp.dest('./tmp/'));
});

gulp.task('ts', function () {
    return gulp.src('./src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('./tmp/'));
});

gulp.task('css', ['less'], function () {
    return gulp.src(['./src/f7/*.css', './src/app/header.css', './tmp/*.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./app/'));
});

gulp.task('less', function () {
    return gulp.src('./src/**/*.less')
        .pipe(less())
        .pipe(concat('less.css'))
        .pipe(clean())
        .pipe(gulp.dest('./tmp/'));
});

gulp.task('favicons', function (done) {
    favicon.generateFavicon(JSON.parse(fs.readFileSync('./src/app/favicons.json')), function () {
        done();
    });
});

gulp.task('inject-favicons', function () {
    return gulp.src('./src/app/index.php')
        .pipe(favicon.injectFaviconMarkups(JSON.parse(fs.readFileSync('./tmp/favicons.json')).favicon.html_code))
        .pipe(gulp.dest('./app/'));
});
console.timeEnd('Tasks');
console.log('Building...');
