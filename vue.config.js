module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,

    devServer: {
        open: true,
        host: "localhost",
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