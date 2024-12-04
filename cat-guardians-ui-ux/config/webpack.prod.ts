const webpack = require("webpack");
const path = require("path");
const CreateFileWebpack = require("create-file-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");

const AppVersion = require("../package.json").version;
const APP_DIR = path.resolve(__dirname, "../src/");

dotenv.config();

const envKeys = Object.keys(process.env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
  return prev;
}, {});

module.exports = () => {
  const appOptions = {
    path: "./dist",
    fileName: ".env",
    content: `APP_VERSION=${AppVersion}`
  };

  return {
    entry: APP_DIR + "/index.tsx",
    devtool: "eval-source-map",

    resolve: {
      alias: {
        app: APP_DIR
      },
      extensions: [".ts", ".tsx", ".js"],
      plugins: [new TsconfigPathsPlugin()]
    },

    output: {
      // publicPath: "/",
      path: path.join(__dirname, "../dist/resources"),
      filename: `[chunkhash]-build-${AppVersion}.js`,
      chunkFilename: `[chunkhash]-build-[name]-${AppVersion}.js`,
      clean: true
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

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: path.resolve(__dirname, "../src/assets/favicon.png"),
        filename: "../index.html"
      }),
      new ForkTsCheckerWebpackPlugin(),
      new ESLintPlugin({ files: "./src/**/*.{ts,tsx,js,jsx}" }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        ...envKeys,
        PRODUCTION: "production",
        VERSION: JSON.stringify(AppVersion)
      }),
      new CreateFileWebpack(appOptions),
      new BundleAnalyzerPlugin({
        analyzerMode: "disable",
        generateStatsFile: true,
        statsOptions: { source: false }
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "public/locales", to: "locales" }
        ]
      })
    ],

    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
      splitChunks: {
        chunks: "all"
      }
    }
  };
};
