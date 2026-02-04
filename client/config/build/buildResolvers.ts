import {BuildOptions} from "./types/config";
import webpack from "webpack";

export function buildResolvers({paths}: BuildOptions): webpack.ResolveOptions {
    return {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        preferAbsolute: true,
        mainFiles: ['index'],
        modules: [
            paths.src, 'node_modules',
        ],
        alias: {}
    }
}