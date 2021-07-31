import axios from 'axios';
import {Loading} from 'element-ui';
import router from '@/router'
let loading = null;
const service = axios.create({
    baseURL:'/api',
    timeout:5000
})

function startLoading(){
    loading = Loading.service({
        lock:true,
        text:'拼命加载中...',
        background:'rgba(0,0,0,0.7)'
    });
}

function endLoading(){
    loading.close();
}


// 请求拦截
service.interceptors.request.use(config => {
    // 请求前加载动画
    console.log();
    if(router.currentRoute.name !== 'pay'){
        startLoading();
    }
    return config;
}, error => {
    return Promise.reject(error);
})

// 响应拦截
service.interceptors.response.use(response => {
    endLoading();
    return response;
}, error => {
    endLoading();
    return Promise.reject(error);
})

export default service;
