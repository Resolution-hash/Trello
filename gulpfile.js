import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import del from 'del';
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer';
import image from 'gulp-image'
import htmlmin from 'gulp-htmlmin';
import newer from 'gulp-newer';
import browserSync from 'browser-sync';
import gulpPag from 'gulp-pug'



const sass = gulpSass(dartSass)

// Установка путей
const paths = {
  pug: {
    src: 'src/*.pug',
    dest: 'dist/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/images/**',
    dest: 'dist/images/'
  }
}

export const clean = () => {
  return del(['dist/*', '!dist/images'])
}

export const pug = () => {
  return gulp.src(paths.pug.src)
    .pipe(gulpPag())
    .pipe(browserSync.stream())
    .pipe(gulp.dest(paths.pug.dest))
}

export const html = () => {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(browserSync.stream())
    .pipe(gulp.dest(paths.html.dest))
}

export const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(concat('main.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest(paths.styles.dest))
}

export const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest(paths.scripts.dest))
}

export const img = () => {
  return gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(image())
    .pipe(browserSync.stream())
    .pipe(gulp.dest(paths.images.dest))
}



export const watch = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  })
  gulp.watch(paths.html.dest).on('change', browserSync.reload) // перезагрузка при обновление index.html
  gulp.watch(paths.pug.src, pug)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.images.src, img)
}

export const build = gulp.series(clean, pug, gulp.parallel(styles, scripts, img), watch)
export default build