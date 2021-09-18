import pkg from './package'
import env from './env'

const TerserPlugin = require('terser-webpack-plugin');

export default {
    mode: 'universal',
    target: 'server',

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: ['~/assets/css/main.less'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/element-ui',
        '~/plugins/axios'
    ],

    router: {
        // middleware: ''
    },

    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        // '@nuxtjs/proxy'
    ],
    /*
     ** Axios module configuration
     */

    axios: {
        //是否允许跨域
        // proxy: true,
        //开发模式下开启debug
        debug: process.env.NODE_ENV == "production" ? false : true,
        //设置不同环境的请求地址
        baseURL: env[process.env.NODE_ENV].ENV_API,
        //是否是可信任
        withCredentials: true
    },
    // proxy: {
    //     '/api': {
    //         target: env[process.env.NODE_ENV],
    //         pathRewrite: { '^/api': '' }
    //     },
    // },

    /*
     ** Build configuration
     */
    build: {
        extractCSS: true,
        transpile: [/^element-ui/],
        optimization: {
            minimize: true,
            minimizer: [
                // webpack4 使用的压缩插件，用来替代webpack3的 UglifyJsPlugin
                new TerserPlugin({
                    terserOptions: {
                        warnings: false,
                        compress: {
                            drop_console: true, // 可选：false,生产移除 console.log
                            pure_funcs: ['console.log']
                        },
                        output: {
                            // 是否保留代码注释
                            comments: false
                        },
                        cache: true,
                        parallel: true,
                        // Must be set to true if using source-maps in production
                        sourceMap: process.env.NODE_ENV !== 'production'
                    }
                })
            ],
        },
        // 代码打包分割规则
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                    name: 'chunk-elementUI',
                    priority: 20,
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                }
            }
        },
        babel: { // babel相关配置
            // 'plugins': [ // element-ui 按需加载
            //     [
            //         'component',
            //         {
            //             'libraryName': 'element-ui',
            //             'styleLibraryName': 'theme-chalk'
            //         }
            //     ]
            // ],
            'comments': true
        },
        publicPath: '/static/', // 配置打包的静态资源文件目录。可以是cdn地址
        filenames: { // 打包的文件名规则
            app: ({ isDev }) => isDev ? '[name].js' : '[name].[chunkhash].js',
            chunk: ({ isDev }) => isDev ? '[name].js' : '[name].[chunkhash].js',
            css: ({ isDev }) => isDev ? '[name].css' : '[name].[contenthash].css',
            img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[hash:7].[ext]',
            font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
        },
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}