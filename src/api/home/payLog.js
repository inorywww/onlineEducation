/**
 * 用户购买相关接口
 */
 import request from '../request';
 import base from './base';
 import { getToken } from "@/utils/userAuth";
 
 const baseUrl = base.payLog;
 const payLog = {
    // 根据订单号生成微信支付二维码
    createNative(orderId){
        return request({
            url: `${baseUrl}/createNative/${orderId}`,
            method:'get',
            headers:{
                token:getToken()
            }
        })
     },
     //根据订单号查询订单支付情况
    getPayStatus(orderId){
        return request({
            url:`${baseUrl}/queryPayStatus/${orderId}`,
            method:'get',
        })
    },
  }
  export default payLog