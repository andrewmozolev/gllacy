var gulp = require('gulp');

var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var cssnano = require('gulp-cssnano');
var csscomb = require('gulp-csscomb');
var autoprefixer = require('autoprefixer');
var flexboxfixer = require('postcss-flexboxfixer');
var sourcemaps = require('gulp-sourcemaps');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var svgSprite = require('gulp-svg-sprite');
// var cheerio = require('gulp-cheerio');


var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var gulpIf = require('gulp-if');
var del = require('del');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

// Path
var path = {
  build: {
    html: '.',
    js: 'js/',
    css: 'css/',
    img: 'img/',
    fonts: 'font/'
    },
  src: {
    html: 'src/*.html',
    js: 'src/_js/*.js',
    scss: 'src/scss/style.scss',
    img: 'src/_img/**/*.*',
    svg: 'src/_svg-sprite/**/*.svg',
    fonts: 'src/_fonts/**/*.*'
    },
  watch: {
    html: '*.html',
    js: 'src/_js/**/*.js',
    scss: 'src/scss/**/*.scss',
    img: 'src/_img/**/*.*',
    svg: 'src/_svg/**/*.svg',
    fonts: 'src/_fonts/**/*.*'
    },
  };

//  Gulp IMAGE
gulp.task('image', function () {
  return gulp.src(path.src.img)
  .pipe(newer(path.build.img))
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
    }))
  .pipe(gulp.dest(path.build.img))
  });


//  Gulp SVG-Sprite
gulp.task('svg', function() {
  return gulp.src(path.src.svg)
  .pipe(svgSprite({
    mode: {
      symbol: {
        dest: '.',
        dimensions: '%s',
        sprite: 'img/svg-sprite.svg',
        example: false,
        render: {scss: {dest: 'src/scss/global/_svg-sprite.scss'}}
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false
    }
  }))
  .pipe(gulp.dest('./'));
  });


//  Gulp HTML
gulp.task('html', function () {
  return gulp.src(path.build.html)
  .pipe(browserSync.stream())
  });

//  Gulp SCSS
gulp.task('sass', function () {
  var processors = [
  flexboxfixer,
  autoprefixer({browsers: ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4']}),
  ];
  return  gulp.src(path.src.scss)
  .pipe(gulpIf(isDevelopment, sourcemaps.init()))
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
    }))
  // .pipe(postcss([ autoprefixer({ browsers: ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4'] }) ]))
  .pipe(postcss(processors))
  .pipe(csscomb())
  .pipe(gulpIf(isDevelopment, sourcemaps.write()))
  .pipe(gulp.dest(path.build.css))
  .pipe(browserSync.stream())
  .pipe(cssnano())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest(path.build.css))
  .pipe(notify({
    message:'CSS complite: <%= file.relative %>!',
    sound: 'Pop'
    }))
  .pipe(browserSync.stream())
  });

// Gulp Fonts
gulp.task('fonts', function() {
  gulp.src(path.src.fonts)
  .pipe(gulp.dest(path.build.fonts))
  });

//  browserSync
gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: path.build.html
    }
    });
  });

// Clean
gulp.task('clean', function() {
  return del('css');
  return del('js');
});

//  Gulp JS
gulp.task('js', function() {
  gulp.src(path.src.js)
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
    }))
  .pipe(gulp.dest(path.build.js))
  .pipe(concat('scripts.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(path.build.js))
  .pipe(notify({
    message:'JS complite: <%= file.relative %>!',
    sound: 'Pop'
    }))
  });

// build
gulp.task('build', [
  'clean',
  'js',
  'html',
  'fonts',
  'image',
  'sass'
  ]);

// default
gulp.task('default',['build','browser-sync'], function(){
  gulp.watch(path.watch.scss , ['sass']);
  gulp.watch(path.watch.img , ['image', browserSync.reload]);
  gulp.watch(path.watch.fonts , ['fonts', browserSync.reload]);
  gulp.watch(path.watch.js, ['js', browserSync.reload]);
  gulp.watch(path.watch.html,['html']);
  gulp.watch(path.watch.svg,['svg']);
  });

