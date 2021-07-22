import request from './request';
import base from './base';
const baseUrl = base.subject;

const subject = {
    getAllSubject(){
        return request({
            url:`${baseUrl}/getAllSubject`,
            method: 'get',
        })
    },
    addSubject(data){
        return request({
            url:`${baseUrl}/addSubject`,
            method: 'post',
            data
        })
    }
}

export default subject;