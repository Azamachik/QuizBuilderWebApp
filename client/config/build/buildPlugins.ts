import {BuildOptions} from "./types/config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';


export function buildPlugins({paths, isDev}: BuildOptions) {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:6].css",
            chunkFilename: "css/[name].[contenthash:6].css",
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
        
    ];
    
    if (isDev) {
        // plugins.push(new ReactRefreshWebpackPlugin({overlay: false}));
        // plugins.push(new BundleAnalyzerPlugin());
    }
    
    return plugins;
}