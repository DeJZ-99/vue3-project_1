import { createStore } from "vuex";
import Cookies from "js-cookie";

export default createStore({
    state: {
        // 菜单栏和首页按钮的通信状态
        isCollapse: true,
        // 面包屑通信状态
        currentMenu: null,
        tableList: [{
            path: '/',
            name: 'home',
            label: '首页',
            icon: 'home'
        }],
        // 侧边栏菜单 动态渲染
        menu: [],
        // token 身份验证
        token: ''
    },
    mutations: {
        /**
         * 更新菜单栏和首页按钮的通信状态改变函数
         * @param {*} state 菜单栏和首页按钮的通信状态
         * @param {*} payload 调用时传入的参数
         */
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse;
        },
        /**
         * 面包屑通信状态态改变函数
         * @param {*} state
         * @param {*} val 
         */
        selectMenu(state, val) {
            // 
            val.name == "home" ? (state.currentMenu = null) : (state.currentMenu = val);

            if (val.name == 'home') {
                state.currentMenu = null;
            } else {
                state.currentMenu = val;
                let result = state.tableList.findIndex(item => item.name === val.name);
                result == -1 ? state.tableList.push(val) : '';
            }
        },
        /**
         * 关闭标签
         * @param {*} state 
         * @param {*} val 
         */
        closeTab(state, val) {
            let res = state.tableList.findIndex(item => item.name === val.name);
            state.tableList.splice(res, 1);
        },
        /**
         * 设置侧边栏菜单
         * @param {*} state 
         * @param {*} val 
         */
        setMenu(state, val) {
            state.menu = val;
            localStorage.setItem('menu', JSON.stringify(val));
        },
        /**
         * 加载菜单数据
         * @param {*} state 
         * @param {*} router 
         * @returns 
         */
        addMenu(state, router) {
            if (!localStorage.getItem('menu')) {
                return;
            }
            const menu = JSON.parse(localStorage.getItem('menu'));
            state.menu = menu;
            // 动态路由
            const menuArray = [];
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        let url = `../views/${item.url}.vue`;
                        item.component = () => import(url);
                        return item;
                    });
                    menuArray.push(...item.children);
                } else {
                    let url = `../views/${item.url}.vue`;
                    item.component = () => import(url);
                    menuArray.push(item);
                }
            });
            menuArray.forEach(item => {
                router.addRoute('home1', item);
            });
        },
        /**
         * 清楚菜单
         * @param {*} state 
         */
        cleanMenu(state) {
            state.menu = [];
            localStorage.removeItem('menu');
        },
        /**
         * 设置token
         * @param {*} state 
         * @param {*} val 
         */
        setToken(state, val) {
            state.token = val;
            Cookies.get('token', val);
        },
        /**
         * 清除token
         * @param {*} state 
         */
        clearToken(state) {
            state.token = '';
            Cookies.remove('token');
        },
        /**
         * 获取token
         * @param {*} state 
         */
        getToken(state) {
            state.token = state.token || Cookies.get('token');
        }
    }
})