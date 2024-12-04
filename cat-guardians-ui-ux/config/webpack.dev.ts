const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");

dotenv.config();

const envKeys = Object.keys(process.env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
  return prev;
}, {});

const APP_DIR = path.resolve(__dirname, "../src/");

module.exports = {
  entry: APP_DIR + "/index.tsx",

  resolve: {
    alias: {
      app: APP_DIR
    },
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin()]
  },

  output: {
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        },
        exclude: /dist/
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(svg|png|gif|jpg)$/,
        exclude: /images/,
        loader: "file-loader"
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        exclude: /fonts/,
        loader: "file-loader"
      }
    ]
  },

  devServer: {
    historyApiFallback: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: path.resolve(__dirname, "../src/assets/favicon.png")
    }),
    new webpack.DefinePlugin({
      ...envKeys,
      PRODUCTION: "development"
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({ files: "./src/**/*.{ts,tsx,js,jsx}" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/locales", to: "locales" }
      ]
    })
  ],
  devtool: "eval-cheap-module-source-map"
};
