import Mock from "mockjs";
import homeApi from './mockData/home.js'
import userApi from './mockData/user.js'
import permissionApi from "./mockData/permission.js";
// 拦截请求 首页数据
Mock.mock('/home/getTableData', homeApi.getHomeData);
Mock.mock('/home/getCountData', homeApi.getCountData);
Mock.mock('/home/getEchartsData', homeApi.getEchartsData);
// 用户管理数据拦截
Mock.mock(/user\/getUser/, 'get', userApi.getUserList);
Mock.mock(/user\/add/, 'post', userApi.createUser);
Mock.mock(/user\/edit/, 'post', userApi.updateUser);
Mock.mock(/user\/delete/, 'get', userApi.deleteUser);
// 登录拦截
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)