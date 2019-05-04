const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const packageJson = require('./package.json')
const vendorDependencies = Object.keys(packageJson['dependencies'])

const threadLoader = {
  loader: 'thread-loader',
  options: {
    // there should be 1 cpu for the fork-ts-checker-webpack-plugin
    workers: require('os').cpus().length - 1
  }
}

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
  }
}

module.exports = {
  cache: true,
  entry: {
    main: './src/index.tsx',
    vendor: vendorDependencies
  },
  optimization: {
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          threadLoader,
          babelLoader
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=build/[path][name].[ext]',
        exclude: /images/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=build/[path][name].[ext]',
        include: /images/
      },
      {
        test: /\.scss$/,
        use: [{
          loader: require.resolve('style-loader')
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        {
          // Webpack expects all url(...) paths in SASS files to be found relative to the root.scss file we import in our react components, 
          // but the paths we use are relative to the .scss file that contains the url(...) line.  This loader will update the urls to match 
          // webpack's expectations.
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: true
          }
        },
        {
          loader: require.resolve('sass-loader'),
          options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tslint: true,
      watch: ['./src'] // optional but improves performance (less stat calls)
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    })
  ],
  resolve: {
    extensions: ['.webpack.js', '.ts', '.tsx', '.js', '.jsx', '.json', 'scss']
  }
}
