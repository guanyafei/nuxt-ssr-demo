import { Message } from 'element-ui'

export default function({ store, redirect, $axios, app }) {
    // 后端接口地址
    // $axios.defaults.baseURL = 'http://exps.wl.uat.gomedc.com'
    // Request拦截器：设置Token
    $axios.onRequest((config) => {
            console.log("cookies", app.$cookies.get('token'))
                // TODO 使用Vuex存储Token，并做持久化处理
                // config.headers.common['X-Token'] = store.state.token
            config.headers['Authorization'] = 'Bearer ' + app.$cookies.get('token')
                // get请求映射params参数
            if (config.method === 'get' && config.params) {
                let url = config.url + '?';
                for (const propName of Object.keys(config.params)) {
                    const value = config.params[propName];
                    let part = encodeURIComponent(propName) + "=";
                    if (value !== null && typeof(value) !== "undefined") {
                        if (typeof value === 'object') {
                            for (const key of Object.keys(value)) {
                                let params = propName + '[' + key + ']';
                                let subPart = encodeURIComponent(params) + "=";
                                url += subPart + encodeURIComponent(value[key]) + "&";
                            }
                        } else {
                            url += part + encodeURIComponent(value) + "&";
                        }
                    }
                }
                url = url.slice(0, -1);
                config.params = {};
                config.url = url;
            }
            return config
        })
        // Response拦截器：对正常返回的数据进行处理
    $axios.onResponse((response) => {
            return response.data
        })
        // Error拦截器：出现错误的时候被调用，根据状态码做对应判断并显示全局Message
    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        switch (code) {
            // 未登录
            case 401:
                break
            case 404:
                break
            default:
                break
        }
        Message({
            message: '服务器开小差了~',
            type: 'error'
        })
        return Promise.reject(new Error(error.response.data.message))
    })
}