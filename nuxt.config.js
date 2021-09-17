import pkg from './package'
import env from './env'
console.log("eeeeeeeeee", env[process.env.NODE_ENV])
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
    css: ['@/assets/css/main.less'],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/element-ui',
        '@/plugins/axios'
    ],

    router: {
        // middleware: ''
    },

    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios'
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
        transpile: [/^element-ui/],

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