/**
 * 环境配置文件
 * 一般在企业级项目有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 */
// 当前的环境
const env = import.meta.env.MODE || 'prad';

const EnvConfig = {
    development: {
        // baseApi: '/api',
        baseApi: '',
        mockApi: '/home/getData',
    },
    test: {
        baseApi: '//test.future.com/api',
        mockApi: '/home/getData',
    },
    pro: {
        baseApi: '//future.com/api',
        mockApi: '/home/getData',
    }
}

export default {
    env,
    // mock总开关
    mock: true,
    ...EnvConfig[env]
}