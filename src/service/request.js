import axios from 'axios'
import { changeGlobalLoadingAction } from "@/global-data/store/actionCreators";
import store from "@/store";
// 导入配置
import { BASE_URL, TIMEOUT } from './config'

//create a axios
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});

instance.interceptors.request.use(config => {
  // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
  store.dispatch(changeGlobalLoadingAction(true));
  // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面
  if (config.url!=="/login"&&config.url!=="/register"){
    const userInfo = JSON.parse(window.localStorage.getItem('user'));//读取 字符串转换成对象才能使用
    if (!userInfo.token){
      //token不存在时
    }else{
      config.headers.authorization=userInfo.token;
    }
  }

  // 3.params/data序列化的操作

  return config;
}, err => {
});

instance.interceptors.response.use(res => {
  store.dispatch(changeGlobalLoadingAction(false));
  return res.data;
}, err => {
  store.dispatch(changeGlobalLoadingAction(false));
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log("请求错误");
        break;
      case 401:
        console.log("未授权访问");
        break;
      default:
        console.log("其他错误信息");
    }
  }
  return Promise.reject(err);
});

export default instance;
