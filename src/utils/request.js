import axios from "axios";
import qs from "qs";
import local from "@/utils/local";

//默认请求地址
axios.defaults.baseURL = " http://172.16.11.201:5000"
// axios.defaults.baseURL = " http://127.0.0.1:5000"
//请求拦截
axios.interceptors.request.use(config => {
    // 在请求发送出去之前 带上一些东西 config是请求的配置对象， 如果直接返回 就等于什么都不带

    // 所有的axios请求，在请求发送出去之前 带上token

    config.headers.Authorization = 'Bearer ' + local.get('token');

    return config;
}, error => {
    return Promise.reject(error);
})
//响应拦截
axios.interceptors.response.use(response => {

    return response;
}, error => {
    return Promise.reject(error);
})



//暴露发送请求的两种方法
export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params })
                .then(res => { resolve(res.data) })
                .catch(err => { reject(err) })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(res => { resolve(res.data) })
                .catch(err => { reject(err) })
        })
    }
}