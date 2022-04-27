import gulp from "gulp";
import plumber from "gulp-plumber";
import sourcemap from "gulp-sourcemaps";
import scss from 'sass';
import gulpSass from 'gulp-sass';
import postcss from "gulp-postcss";
import csso from "postcss-csso";
import autoprefixer from "autoprefixer";
import sync from "browser-sync";
import imagemin from "gulp-imagemin";
import mozjpeg from "imagemin-mozjpeg";
import optipng from "imagemin-optipng";
import svgo from "imagemin-svgo";
import webp from "gulp-webp";
import svgstore from "gulp-svgstore";
import rename from "gulp-rename";
import htmlmin from "gulp-htmlmin";
import uglify from "gulp-uglify";
import del from "del";

const sass = gulpSass(scss);
const config = {
  plugins: [{
    removeAttrs: {attrs: 'fill'},
  }]
}


//styles
const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write('../css'))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream())
}
export { styles };

//server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//watcher
const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/*.html").on("change", gulp.series(minifyHTML));
  gulp.watch("source/*.html").on("change", sync.reload);
  gulp.watch("source/scripts/*.js").on("change", gulp.series(minifyJS));
  gulp.watch("source/scripts/*.js").on("change", sync.reload);
}
export default gulp.series(styles, server, watcher);

//images
const optimizeImages = () => (
  gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      mozjpeg({ progressive: true }), // quality: 75
      optipng({ optimizationLevel: 3 }),
      svgo([
        'svgo',
        {
          plugins: [
            {
              name: 'removeViewBox',
              active: false
            },
          ],
        },
      ])
    ]))
    .pipe(gulp.dest('build/img'))
);
export { optimizeImages };

// webp
const createWebp = async () => {
  gulp.src('source/img/**/*.{jpg,png}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('build/img/webp'))
}
export { createWebp };

// svg sprite
const createSprite = async () => {
  gulp.src('source/img/sprite/*.svg')
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
}
export { createSprite };

// htmlmin
const minifyHTML = async () => {
  gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
}
export { minifyHTML };


// fonts
const copyFonts = async () => {
  gulp.src('source/fonts/*.{woff,woff2}')
    .pipe(gulp.dest('build/fonts'))
}
export { copyFonts };

// js
const minifyJS = async () => {
  gulp.src('source/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'))
  }
export { minifyJS };

// clean
const clean = () => {
  return del(['build']);
}
export { clean };

//build
const build = gulp.series(
  clean,
  gulp.parallel(
    copyFonts,
    styles,
    minifyHTML,
    minifyJS,
    createSprite,
    optimizeImages,
    createWebp)
)
export { build };
