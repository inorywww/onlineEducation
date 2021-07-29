/**
 * 前台课程部分接口
 */
import request from '../request';
 import base from './base';
 const baseUrl = base.courseFront;
 
 const courseFront = {
     // 获取首页热门课程和老师
    getCourseDetail(id){
        return request({
            url: `${baseUrl}/getFrontCourseInfo/${id}`,
            method:'get',
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