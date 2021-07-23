/**
 * 课程小节管理
 */
import request from './request';
import base from './base';
const baseUrl = base.video;

const video = {
    // 根据小节id删除
    delVideo(videoId){
        return request({
            url:`${baseUrl}/${videoId}`,
            method: 'delete',
        })
    },
    //添加课程小节
    addSubject(data){
        return request({
            url:`${baseUrl}/addVideo`,
            method: 'post',
            data
        })
    },
    //更新课程小节
    updateVideo(data){
        return request({
            url:`${baseUrl}/updateVideo`,
            method: 'post',
            data
        })
    },
}

export default video;