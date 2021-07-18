module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,

    devServer: {
        open: true,
        host: "localhost",
        proxy: {
            '/api': {
                target: "http://localhost:8001/api/"
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import '@/assets/style/variable.scss';
                @import '@/assets/style/mixin.scss';
                `
            }
        },
    }
}