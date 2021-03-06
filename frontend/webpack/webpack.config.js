const path = require('path');
const webpack = require('webpack');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const TimeFixPlugin = require('time-fix-plugin');

const assetsPath = path.resolve(__dirname, '../static/dist');
const smp = new SpeedMeasurePlugin({ disable: process.env.STATS });


module.exports = smp.wrap({
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),

  output: {
    path: assetsPath,
    publicPath: '/static/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules(\/|\\)(?!(superagent))/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/superagent')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      },
      {
        test: /\.(mov|mp4|ogv|webm)$/,
        loader: 'file-loader'
      },
    ]
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      containers: path.resolve(__dirname, '../src/containers'),
      helpers: path.resolve(__dirname, '../src/helpers'),
      store: path.resolve(__dirname, '../src/store'),
      shared: path.resolve(__dirname, '../src/shared'),
      config: path.resolve(__dirname, '../src/config.js'),
      routes: path.resolve(__dirname, '../src/routes.js')
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
    ],
    extensions: ['.json', '.js']
  },

  plugins: [
    new TimeFixPlugin(),
    new webpack.EnvironmentPlugin({
      APP_HOST: 'localhost:8089',
      ALLOW_DAT: false,
      ANON_DISABLED: false,
      ANNOUNCE_MAILING_LIST: null,
      CONTENT_HOST: 'localhost:8092',
      FRONTEND_PORT: 8095,
      SCHEME: 'http',
      PUBLIC_IP: process.env.PUBLIC_IP,
    })
  ],

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
});
