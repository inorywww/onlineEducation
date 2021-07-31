/**
 * 视频管理
 */
 import request from '../request';
 import base from './base';
 const baseUrl = base.vod;
 
 const vod = {
     //上传视频
    upload(data){
         return request({
             url:`${baseUrl}/uploadAlyVideo`,
             method: 'post',
             data,
             headers: {
                 'Content-Type': 'multipart/form-data'
             },
         })
    },
    //删除视频
    delVideo(id){
        return request({
            url:`${baseUrl}/removeAlyVideo/${id}`,
            method: 'delete',
        })
    },
    // 获取视频链接
    getPlayUrl(id){
        return request({
            url:`${baseUrl}/getPlayUrl/${id}`,
            method: 'get',
        })
    }
 }
 export default vod