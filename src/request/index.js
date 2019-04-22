import axios from 'axios';
import 'axios-response-logger';
import {message} from 'antd';

const axiosInstans = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,
});

// 请求拦截器
axiosInstans.interceptors.request.use(function (config) {
    // 在发送之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    message.error(error);
    return Promise.reject(error);
});

// 响应拦截器
axiosInstans.interceptors.response.use(function (response) {
    // 对响应数据做些什么
    // console.log('Response：', response);
    return response
}, function (error) {
    // 对响应错误做些什么
    console.log(error);
    return Promise.reject(error);
});

export default axiosInstans;
