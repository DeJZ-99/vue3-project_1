/**
 * 项目api管理
 */
import request from './request.js'

export default {
    /**
     * 主页表格数据请求路由
     * @param {*} params 数据
     * @returns 
     */
    getTableData(params) {
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: params,
            mock: false
        })
    },
    /**
     * 主页标签数据请求路由
     * @param {*} params 数据
     * @returns 
     */
    getCountData(params) {
        return request({
            url: '/home/getCountData',
            method: 'get',
            data: params,
            mock: false
        })
    },
    /**
     * 主页统计图数据请求路由
     * @param {*} params 数据
     * @returns 
     */
    getEchartsData(params) {
        return request({
            url: '/home/getEchartsData',
            method: 'get',
            data: params,
            mock: false
        })
    },
    /**
     * 用户管理表格数据请求路由
     * @param {*} params 数据
     * @returns 
     */
    getUserData(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            data: params,
            mock: false
        })
    },
    /**
     * 新增用户数据请求路由
     * @param {*} params 数据
     * @returns 
     */
    addUser(params) {
        return request({
            url: '/user/add',
            method: 'post',
            data: params,
            mock: false
        })
    },
    /**
     * 编辑用户数据请求路由
     * @param {*} params 数据
     * @returns 
     */
    editUser(params) {
        return request({
            url: '/user/edit',
            method: 'post',
            data: params,
            mock: false
        })
    },
    /**
     * 删除用户数据请求路由
     * @param {*} params 数据
     * @returns 
     */
    deleteUser(params) {
        return request({
            url: '/user/delete',
            method: 'get',
            data: params,
            mock: false
        })
    },
    /**
     * 用户权限菜单列表请求路由
     * @param {*} params 数据
     * @returns 
     */
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            data: params,
            mock: false
        })
    }
}