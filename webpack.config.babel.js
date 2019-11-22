import path from 'path';
import TestPlugin from './testPlugin.js'

const nodeEnv = process.env.NODE_ENV || 'development';
const devMode = nodeEnv === 'development';

console.log('nodeEnv ==> ', nodeEnv);
console.log('devMode ==> ', devMode);

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './dist');

const config = {
  mode: nodeEnv,
  entry: {
    app: `${src}/js/app.js`
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: `${dist}/`,
  },
  module: {
    rules: [
      // {
      //   test: /\.(jsx?|vue)$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: { failOnError: false }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({ grid: true })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new TestPlugin({
      text: 'this is text option',
      development: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.json']
  },
  devServer: {
    open: 'Google Chrome',
    inline: true,
    hot: true,
    port: 8080,
    contentBase: dist
  },
}

export default config;
