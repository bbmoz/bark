const path = require('path')

const $ = {
  webpack: {
    Uglify: require('webpack').optimize.UglifyJsPlugin,
    Html: require('html-webpack-plugin'),
    Copy: require('copy-webpack-plugin')
  },
  postcss: {
    bem: require('postcss-bem-linter'),
    cssnano: require('cssnano'),
    reporter: require('postcss-reporter')
  }
}

module.exports = {
  entry: {
    popup: './src/popup/popup.js',
    devtools: './src/devtools/devtools.js',
    omnibox: './src/omnibox/omnibox.js',
    templates: './src/popup/templates/templates.js'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.css$/,
      loader: 'css!postcss'
    }]
  },

  plugins: [
    new $.webpack.Uglify(),

    new $.webpack.Html({
      template: './src/popup/popup.html',
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),

    new $.webpack.Copy([
      { from: './src/manifest.json' },
      { from: './src/**/*.png', flatten: true },
      { from: './node_modules/handlebars/dist/handlebars.min.js' }
    ])
  ],

  postcss: function () {
    return [
      $.postcss.bem,
      $.postcss.cssnano,
      $.postcss.reporter
    ]
  }
}
