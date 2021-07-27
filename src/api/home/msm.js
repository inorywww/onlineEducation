/**
 * 发送短信相关接口
 */
 import request from '../request';
 import base from './base';
 const baseUrl = base.msm;
 
 const msm = {
     // 发送短信
    send(tel){
        return request({
            url: `${baseUrl}/send/${tel}`,
            method:'get',
        })
    },
 }
 export default msm