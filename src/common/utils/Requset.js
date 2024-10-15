/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: limingliang
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: limingliang
 * @LastEditTime: 2022-04-22 09:33:56
 */

import axios from "axios";

import {Axios as service} from "tiklab-core-ui";
import {message} from "antd";

const Service = (url, data) => {
    return service.request({
        url: url,
        method: "post",
        data: data
    }).then(res=>{
        if (res.code!==0){
            message.info(res.msg)
        }
        return res
    })
}

const ServiceGet = (url, data) => {
    return service.request({
        url: url,
        method: "get",
        data: data
    })
}
const serviceLoc = axios.create({
    // baseURL: '/devapi',
    timeout: 5000
});
// 请求拦截
serviceLoc.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截
serviceLoc.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
})

const ServiceLocal = (url, data) => {
    return serviceLoc.request({
        url: url,
        method: "post",
        data: data
    })
}
export {service,serviceLoc, Service, ServiceLocal, ServiceGet};
