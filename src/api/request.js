import axios from "axios";
import config from "../config";
import { ElMessage } from 'element-plus';

const NETWORK_ERROE = '网络请求异常，请稍后重试...';

// 创建一个axios实例对象
const service = axios.create({
    baseURL: config.baseApi
    // baseURL: ''
});
// 在请求之前做一些事情 请求拦截
service.interceptors.request.use((req) => {
    // 可以自定义header
    // jwt-token认证的时候
    return req;
});
// 在请求之后做一些事情 响应拦截
service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data;
    if (code == 200) {
        return data;
    } else {
        ElMessage.error(msg || NETWORK_ERROE);
        return Promise.reject(msg || NETWORK_ERROE)
    }
});
// 封装的核心函数
function request(options) {
    options.method = options.method || 'get';
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data;
    }
    // 对mock处理
    let isMock = config.mock;
    if (typeof options.mock !== 'unfefind') {
        isMock = options.mock;
    }
    // 对线上环境做处理
    if (config.env == 'pard') {
        // 不给你用mock的机会
        service.defaults.baseURL = config.baseApi;
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
    }
    return service(options)
}

export default request;