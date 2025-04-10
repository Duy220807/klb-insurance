import { UserConfigExport } from "@tarojs/cli";

export default {
    env: {
        NODE_ENV: '"uat"',
    },
    defineConstants: {},
    mini: {},
    h5: {
        publicPath: '/',
        staticDirectory: 'static',
        output: {
            filename: 'js/[name].[hash].js',
            chunkFilename: 'js/[name].[chunkhash].js',
        },
        miniCssExtractPluginOption: {
            ignoreOrder: true,
        },
        esnextModules: ['taro-ui'],
    },
} satisfies UserConfigExport<'webpack5'>
