import request from './request';
import base from './base';
const baseUrl = base.teacher;

const teacher = {
    findAll(){
        return request({
            url:`${baseUrl}/findAll`,
            method: 'get',
        })
    }
}

export default teacher;