const path = require("path");
const htmlWebpack = require("html-webpack-plugin");
const miniCss = require("mini-css-extract-plugin");
const copyWebpack = require("copy-webpack-plugin");
const dotEnv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js", //punto de entrada
  output: {
    path: path.resolve(__dirname, "dist"), //donde se guarda el proyecto
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: 'development',
  watch: true,
  resolve: {
    //extensiones
    extensions: [".js"],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    },
  },
  module: {
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.m?js$/,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader",
        },
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [miniCss.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new htmlWebpack({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new miniCss({
      filename: 'assets/[name].[contenthash].css'
    }),
    new copyWebpack({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new dotEnv({
      
    })
  ],
};
