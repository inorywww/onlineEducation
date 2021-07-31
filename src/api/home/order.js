/**
 * 用户订单相关接口
 */
import request from '../request';
import base from './base';
import { getToken } from "@/utils/userAuth";

const baseUrl = base.order;
const order = {
     // 课程id生成订单
    createOrder(id){
        return request({
            url: `${baseUrl}/createOrder/${id}`,
            method:'post',
            headers:{
                token:getToken()
            },
            
        })
    },
    //根据订单id查询订单信息
    getOrderInfo(orderId){
        return request({
            url:`${baseUrl}/getOrderInfo/${orderId}`,
            method:'get',
        })
    },
    // 根据订单id和用户id查询是否购买了该课程
    isBuyCourse(courseId, userId){
        return request({
            url:`${baseUrl}/register/${courseId}/${userId}`,
            method:'get',
        })
    }
 }
 export default order