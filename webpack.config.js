const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const loader = require("ts-loader");

module.exports = (env, argv) => {
    const prod = argv.mode === "production";

    return {
        mode: prod ? "production" : "development",
        devtool: prod ? "hidden-source-map" : "eval",
        entry: "./src/index.tsx",
        output: {
            path: path.join(__dirname, "/dist"),
            filename: "[name].js",
        },
        devServer: {
            port: 3000,
            hot: true,
            proxy: {
                "/api": {
                    target: "http://localhost:8080",
                    pathRewrite: { "^/api": "/" },
                },
            },
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            fallback: {},
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        "babel-loader",
                        {
                            loader: "ts-loader",
                            options: {
                                compilerOptions: {
                                    noEmit: false,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(css|scss)$/i,
                    use: ["style-loader", "css-loader"],
                    // exclude: /node_modules/, //제외함
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                    exclude: /node_modules/,
                    use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
                },
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                React: "react",
                process: "process/browser.js",
            }),
            new HtmlWebpackPlugin({
                // template: process.env.NODE_ENV === "production" ? "./index.html" : "./public/index.html",
                template: "./public/index.html",
                minify:
                    process.env.NODE_ENV === "production"
                        ? {
                              collapseWhitespace: true, // 빈칸 제거
                              removeComments: true, // 주석 제거
                          }
                        : false,
            }),
            new webpack.DefinePlugin({
                "process.env.PUBLIC_URL": prod === "production" ? JSON.stringify("/public") : JSON.stringify(""),
            }),
            // new CleanWebpackPlugin(),
        ],
    };
};
