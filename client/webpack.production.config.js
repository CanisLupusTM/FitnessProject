const path = require('path');
const webpack = require('webpack');

module.exports = {
  debug: false,
  context: path.resolve(__dirname, 'src'),
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'app.min.js',
  },
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css?modules'],
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css?modules', 'sass'],
      exclude: /node_modules/,
    }, {
      test: /node_modules\/.+\.css$/,
      loaders: ['style', 'css'],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-0', 'react-optimize'],
        plugins: ['transform-runtime'],
      },
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.woff\d?(\?.+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.ttf(\?.+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream',
    }, {
      test: /\.eot(\?.+)?$/,
      loader: 'url?limit=10000',
    }, {
      test: /\.svg(\?.+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    }, {
      test: /\.png$/,
      loader: 'url?limit=10000&mimetype=image/png',
    }, {
      test: /\.gif$/,
      loader: 'url?limit=10000&mimetype=image/gif',
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        FITRUN_SERVER_URL: JSON.stringify('server-fitrun.44fs.preview.openshiftapps.com'),
        FITRUN_SERVER_PORT: JSON.stringify('443'),
        FITRUN_SERVER_PROTOCOL: JSON.stringify('https'),
        FITRUN_CLIENT_URL: JSON.stringify('client-fitrun.44fs.preview.openshiftapps.com'),
        FITRUN_CLIENT_PORT: JSON.stringify('9000'),
        FITRUN_CLIENT_PROTOCOL: JSON.stringify('https'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  node: {
    fs: 'empty',
  },
};
