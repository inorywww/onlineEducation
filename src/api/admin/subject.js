/**
 * 课程分类管理
 */
import request from '../request';
import base from './base';
const baseUrl = base.subject;

const subject = {
    //获取所有课程分类
    getAllSubject(){
        return request({
            url:`${baseUrl}/getAllSubject`,
            method: 'get',
        })
    },
    //增加课程分类
    addSubject(data){
        return request({
            url:`${baseUrl}/addSubject`,
            method: 'post',
            data
        })
    }
}

export default subject;