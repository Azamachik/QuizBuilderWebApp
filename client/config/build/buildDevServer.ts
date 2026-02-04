import {BuildOptions} from "./types/config";
import type { Configuration as DevServerConfiguration }
    from 'webpack-dev-server';

export function buildDevServer({port}: BuildOptions): DevServerConfiguration {
    return {
        port: port,
        open: true,
        historyApiFallback: true,
        hot: true,
        client: {
            overlay: {
                errors: false,
                warnings: false,
                runtimeErrors: false,
            },
        },
    };
}