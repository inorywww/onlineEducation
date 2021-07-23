/**
 * 课程大纲管理
 */
import request from './request';
import base from './base';
const baseUrl = base.chapter;

const chapter = {
    // 根据章节id删除
    delChapter(chapterId){
        return request({
            url:`${baseUrl}/${chapterId}`,
            method: 'delete',
        })
    },
    // 添加章节
    addChapter(data){
        return request({
            url:`${baseUrl}/addChapter`,
            method: 'post',
            data
        })
    },
    //根据章节id查询章节信息
    getChapterInfo(chapterId){
        return request({
            url:`${baseUrl}/getChapterInfo/${chapterId}`,
            method: 'get',
        })
    },
    //根据课程id查询所有该课程的章节
    getChapterVideo(courseId){
        return request({
            url:`${baseUrl}/getChapterVideo/${courseId}`,
            method: 'get',
        })
    },
    //修改章节信息
    updateChapter(data){
        return request({
            url:`${baseUrl}/updateChapter`,
            method: 'post',
            data
        })
    }
}

export default chapter;