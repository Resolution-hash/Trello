import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import del from 'del';
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'

const sass = gulpSass(dartSass)

// Установка путей
const paths = {
  styles: {
    src: 'src/styles/**/style.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/'
  }
}

export const clean = () => {
  return del(['dist'])
}

export const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
      }))
    .pipe(gulp.dest(paths.styles.dest)) 
} 

export const scripts = () => {
  return gulp.src(paths.scripts.src, {
    sourcemaps: true
  })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest)) 
}

export const watch = () => {
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
}

export const build  = gulp.series(clean, gulp.parallel(styles, scripts), watch)
export default build



