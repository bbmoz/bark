const gulp = require('gulp')
const pump = require('pump')
const $ = require('gulp-load-plugins')()

const srcs = {
  css: 'src/**/*.css',
  html: 'src/**/*.html',
  js: 'src/**/*.js',
  misc: [
    'src/manifest.json',
    'src/**/*.png',
    'node_modules/handlebars/dist/handlebars.min.js'
  ]
}
const dist = 'dist/'

gulp.task('css', function (done) {
  pump([
    gulp.src(srcs.css),
    $.postcss([
      require('stylelint')({
        plugins: [
          'stylelint-selector-bem-pattern'
        ],
        rules: {
          'plugin/selector-bem-pattern': {
            preset: 'bem'
          }
        }
      }),
      require('postcss-cssnext')({
        warnForDuplicates: false
      }),
      require('postcss-neat'),
      require('cssnano'),
      require('postcss-reporter')
    ]),
    gulp.dest(dist)
  ], done)
})

gulp.task('html', function (done) {
  pump([
    gulp.src(srcs.html),
    $.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }),
    gulp.dest(dist)
  ], done)
})

gulp.task('js', function (done) {
  pump([
    gulp.src(srcs.js),
    $.babel({
      presets: ['es2015']
    }),
    $.uglify(),
    gulp.dest(dist)
  ], done)
})

gulp.task('misc', function (done) {
  pump([
    gulp.src(srcs.misc),
    gulp.dest(dist)
  ], done)
})

gulp.task('default', ['css', 'html', 'js', 'misc'])
