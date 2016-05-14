const gulp = require('gulp')
const pump = require('pump')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
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
    $.flatten(),
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
    $.flatten(),
    $.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }),
    gulp.dest(dist)
  ], done)
})

gulp.task('js', function (done) {
  pump([
    gulp.src('noop'),
    webpackStream({
      entry: {
        popup: './src/popup/popup.js',
        devtools: './src/devtools/devtools.js',
        omnibox: './src/omnibox/omnibox.js'
      },
      output: {
        filename: '[name].js'
      },
      module: {
        loaders: [{
          test: /\.js/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
          },
          exclude: /node_modules/
        }]
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin()
      ]
    }),
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
