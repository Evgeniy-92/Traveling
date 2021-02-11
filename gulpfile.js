const { src, dest, parallel, series, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat'); /* конкатенировать файлы (объеденить) */ 
const uglify       = require('gulp-uglify-es').default; /* сжать файлы */
const scss         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss     = require('gulp-clean-css'); /* убирает преносы, пробелы, коментарии(минифицирует */
const imagemin     = require('gulp-imagemin');
const webp         = require('gulp-webp');
const newer        = require('gulp-newer'); /* следит за изображениями которые сжаты */
const del          = require('del');
const group_media  = require('gulp-group-css-media-queries'); /* собирает медиа запросы */
const rename       = require('gulp-rename');
const ttf2woff     = require('gulp-ttf2woff');
const ttf2woff2    = require('gulp-ttf2woff2');



function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false, /* что бы не показывало сообщение */
        online: true, /* дял работы онлайн или офлайн */

    })
}

function scripts() {
    return src([
        /* 'node_modules/jquery/dist/jquery.min.js', */ /* добавлять все js файлы, которые нужно объединять */
        'app/js/script.js', /* всегда в конце */ 
    ])
    .pipe(concat('script.min.js')) /* конкатенировать файлы (объеденить), создается новый файл */
    .pipe(uglify()) /* сжимает файлы */
    .pipe(dest('app/js/')) /* новый файл выгрузится в эту папку */
    .pipe(browserSync.stream()) /* обновление страницы */
}

function styles() {
    return src('app/scss/style.scss')
    .pipe(
        scss({
            outputStyle: 'expanded'
        }))
    .pipe(group_media())
    .pipe(autoprefixer({ overrideBrowserslist: ['last 5 versions'], grid: true }))
    .pipe(dest('app/css/')) /* выгружает не минифицированный файл */
    .pipe(cleancss(( { level: { 1: { specialComments: 0 } }, /*format: 'beautify' */} ))) /* убирает преносы, пробелы, коментарии */
    .pipe(
        rename({
            extname: '.min.css' /* создаёт новый файл после минификации */
        })
    )
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())
}

function fonts() {
    src('app/fonts/ttf/**/*')
    .pipe(newer('app/fonts/woff'))
    .pipe(ttf2woff())
    .pipe(dest('app/fonts/woff'))
    return src('app/fonts/ttf/**/*')
    .pipe(newer('app/fonts/woff'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts/woff'))
}

function images() {
    return src('app/img/src/**/*')
    .pipe(newer('app/img/dest')) /* следит за изображениями которые сжаты */
    .pipe(
        webp({
            quality: 70
        })
    )
    .pipe(dest('app/img/dest'))
    .pipe(src('app/img/src/**/*'))
    .pipe(newer('app/img/dest'))
    .pipe(imagemin())
    .pipe(dest('app/img/dest'))
    .pipe(browserSync.stream())
}

function cleanimg() {
    return del('app/img/dest/**/*', { force: true })
}

function cleandist() {
    return del('dist/**/*', { force: true })
}

function buildcopy() {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/img/dest/**/*',
        'app/fonts/**/*',
        'app/**/*.html'
    ], { base: 'app' })
    .pipe(dest('dist')) /* копирует с app в dist */
}

function startwatch() {
    watch(['app/**/*.scss', '!app/**/*.min.css'], styles)
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts)
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/img/src/**/*', images)
    watch('app/fonts/src/**/*', fonts)

}

exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;
exports.fonts       = fonts;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.cleandist   = cleandist;

exports.build       = series(cleandist, styles, scripts, fonts, images, buildcopy); /* собирает проект */

exports.default     = parallel(styles, scripts, fonts, images, browsersync, startwatch); 