/**
 * 用户登录注册相关接口
 */
 import request from '../request';
 import base from './base';
import { getToken } from "@/utils/userAuth";

const baseUrl = base.member;
const user = {
     // 根据token获取用户信息
    getUserInfo(){
        return request({
            url: `${baseUrl}/getMemberInfo`,
            method:'get',
            headers:{
                token:getToken()
            },
        })
    },
    login(data){
        return request({
            url:`${baseUrl}/login`,
            method:'post',
            data
        })
    },
    register(data){
        return request({
            url:`${baseUrl}/register`,
            method:'post',
            data,
        })
    }
 }
 export default user