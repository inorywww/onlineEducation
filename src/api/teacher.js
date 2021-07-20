import request from './request';
import base from './base';
const baseUrl = base.teacher;

const teacher = {
    findAll(){
        return request({
            url:`${baseUrl}/findAll`,
            method: 'get',
        })
    },
    pageTeacher(no,size){
        return request({
            url:`${baseUrl}/pageTeacher/${no}/${size}`,
            method: 'get',
        })
    },
    pageTeacherCondition(data,no,size){
        return request({
            url:`${baseUrl}/pageTeacherCondition/${no}/${size}`,
            method: 'post',
            data
        })
    }
}

export default teacher;