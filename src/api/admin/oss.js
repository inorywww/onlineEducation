/**
 * 文件上传管理
 */
import request from '../request';
import base from './base';
const baseUrl = base.oss;

const oss = {
    upload(data){
        return request({
            url:`${baseUrl}/fileoss`,
            method: 'post',
            data,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    },
   
}
export default oss