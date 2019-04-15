import axios from 'axios';
import 'axios-response-logger';

const axiosInstans = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,
});

// 添加拦截器
// 请求拦截器
axiosInstans.interceptors.request.use(function (config) {
    // 在发送之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 响应拦截器
axiosInstans.interceptors.response.use(function (response) {
    // 对响应数据做些什么
    console.log('Response：', response)
    return response
}, function (error) {
    // 对响应错误做些什么
    return Promise.reject(error);
});
// window.axios = axiosInstans
export default axiosInstans;