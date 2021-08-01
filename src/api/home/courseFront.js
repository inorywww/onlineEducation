/**
 * 前台课程部分接口
 */
import request from '../request';
 import base from './base';
 const baseUrl = base.courseFront;
import { getToken } from "@/utils/userAuth";
 
 const courseFront = {
    // 根据token获取课程详情
    getCourseDetail(id){
        return request({
            url: `${baseUrl}/getFrontCourseInfo/${id}`,
            method:'get',
            headers:{
                token:getToken()
            },
        })
    },
    getFilterCourse(data, no, size){
        return request({
            url: `${baseUrl}/getFrontCourseList/${no}/${size}`,
            method:'post',
            data
        })
    }
 }
 export default courseFront