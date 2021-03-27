// commentJS规范
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    runtimeCompiler: true,
    // assetsDir: "./"
    publicPath: './',
    // module.exports 中配置，可加参数，详见github文档或百度
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(new TerserPlugin({
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ['console.log'], // 移除console
                    },
                    format: {
                        comments: false,
                      },
                },
            }))
        }
    }
}