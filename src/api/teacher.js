/**
 * 讲师管理
 */
import request from './request';
import base from './base';
const baseUrl = base.teacher;

const teacher = {
    //查找所有讲师
    findAll(){
        return request({
            url:`${baseUrl}/findAll`,
            method: 'get',
        })
    },
    //查找所有头衔
    getAllCareer(){
        return request({
            url:`${baseUrl}/allCareers`,
            method:'get'
        })
    },
    // 根据id查找讲师
    findTeacherById(id){
        return request({
            url:`${baseUrl}/getTeacher/${id}`,
            method: 'get',
        })
    },
    // 根据id单个删除讲师
    delTeacher(id){
        return request({
            url:`${baseUrl}/${id}`,
            method:'delete',
        });
    },
    // 增加一个讲师
    addTeacher(data){
        return request({
            url:`${baseUrl}/addTeacher`,
            method:'post',
            data,
        });
    },
    // 分页查询讲师
    pageTeacher(no,size){
        return request({
            url:`${baseUrl}/pageTeacher/${no}/${size}`,
            method: 'get',
        })
    },
    // 带条件的分页查询
    pageTeacherCondition(data,no,size){
        return request({
            url:`${baseUrl}/pageTeacherCondition/${no}/${size}`,
            method: 'post',
            data
        })
    },
    updateTeacher(data){
        return request({
            url:`${baseUrl}/updateTeacher`,
            method: 'post',
            data
        })
    }
}

export default teacher;