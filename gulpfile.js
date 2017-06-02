var argv = require('minimist')(process.argv.slice(2));
var concat = require('gulp-concat');
var concatCSS = require('gulp-concat-css');
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var paths = {
    dest: {
        root: 'build',
        css: 'build/css',
        fonts: 'build/fonts',
        js: 'build/js',
        templates: 'build/templates'
    },

    appFiles: {
        root: 'src/*.*',
        css: 'src/**/*.css',
        fonts: 'src/fonts/**/*',
        js: [
            'src/app/**/*.module.js',
            'src/app/**/*.js'
        ],
        templates: 'src/app/**/*.html'
    },

    vendorFiles: {
        css: [
            'node_modules/angular-material/angular-material.min.css'
        ],
        fonts: [
        ],
        js: [
            'node_modules/angular/angular.min.js',
            'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
            'node_modules/angular-material/angular-material.min.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.min.js'
        ]
    }
};

// Production option to minify code
var PROD = argv.prod;

/**
 * Main Tasks
 */
gulp.task('default', ['build', 'watch']);

/**
 * Watch task
 */
gulp.task('watch', ['build'], function () {
    watch(paths.appFiles.root, function () {
        gulp.start('copy');
    });

    watch(paths.appFiles.fonts, function () {
        gulp.start('copy');
    });

    watch(paths.appFiles.js, function () {
        gulp.start('appJS');
    });

    watch(paths.vendorFiles.js, function () {
        gulp.start('vendorJS');
    });

    watch(paths.appFiles.css, function () {
        gulp.start('appCSS');
    });

    watch(paths.vendorFiles.css, function () {
        gulp.start('vendorCSS');
    });

    watch(paths.appFiles.templates, function () {
        gulp.start('copy');
    });
});

/**
 * Build task
 */
gulp.task('build', false, function (cb) {
    runSequence('clean', ['appJS', 'vendorJS', 'appCSS', 'vendorCSS', 'copy'], cb);
});

/**
 * Clean task
 */
gulp.task('clean', false, function () {
    return del([paths.dest.root]);
});

/**
 * appJS
 * Concat app JS files to build. Minify if going to prod.
 */
gulp.task('appJS', false, function () {
    return gulp.src(paths.appFiles.js)
        .pipe(concat('app.js'))
        .pipe(gulpif(PROD, uglify()))
        .pipe(gulp.dest(paths.dest.js));
});

/**
 * vendorJS
 * Concat vendor JS files to build. Minify if going to prod.
 */
gulp.task('vendorJS', false, function () {
    return gulp.src(paths.vendorFiles.js)
        .pipe(concat('vendor.js'))
        .pipe(gulpif(PROD, uglify()))
        .pipe(gulp.dest(paths.dest.js));
});

/**
 * appCSS
 * Concat app CSS files to build. Minify if going to prod.
 */
gulp.task('appCSS', function () {
    return gulp.src(paths.appFiles.css)
        .pipe(concatCSS('app.css'))
        .pipe(gulp.dest(paths.dest.css));
});

/**
 * vendorCSS
 * Concat vendor CSS files to build. Minify if going to prod.
 */
gulp.task('vendorCSS', function () {
    return gulp.src(paths.vendorFiles.css)
        .pipe(concatCSS('vendor.css'))
        .pipe(gulp.dest(paths.dest.css));
});

/**
 * Copy
 */
gulp.task('copy', false, function () {
    gulp.src(paths.appFiles.root)
        .pipe(gulp.dest(paths.dest.root));

    gulp.src(paths.appFiles.fonts)
        .pipe(gulp.dest(paths.dest.fonts));

    gulp.src(paths.vendorFiles.fonts)
        .pipe(gulp.dest(paths.dest.fonts));

    gulp.src(paths.appFiles.templates)
        .pipe(gulp.dest(paths.dest.templates));
});
