/**
 * 课程管理
 */
import request from './request';
import base from './base';
const baseUrl = base.course;

const course = {
    // 根据课程id删除
    delCourse(courseId) {
        return request({
            url: `${baseUrl}/${courseId}`,
            method: 'delete',
        })
    },
    // 添加章节
    addCourse(data) {
        return request({
            url: `${baseUrl}/addCourseInfo`,
            method: 'post',
            data
        })
    },
    //根据课程id查询信息
    getCourseInfo(courseId) {
        return request({
            url: `${baseUrl}/getCourseInfo/${courseId}`,
            method: 'get',
        })
    },
    // 获取课程发布信息
    getPublishCourseInfo(courseId) {
        return request({
            url: `${baseUrl}/getPublishCourseInfo/${courseId}`,
            method: 'get',
        })
    },
    // 分页查询课程
    pageCourse(no,size) {
        return request({
            url: `${baseUrl}/pageCourse/${no}/${size}`,
            method: 'get',
        })
    },
    // 待条件的分页查询课程
    pageCourseCondition(data,no,size) {
        return request({
            url: `${baseUrl}/pageCourseCondition/${no}/${size}`,
            method: 'post',
            data
        })
    },
    //改变status draft -> normal
    publishCourse(courseId) {
        return request({
            url: `${baseUrl}/publishCourse/${courseId}`,
            method: 'post',
        })
    },
    // 改变status  normal -> draft
    unpublishCourse(courseId) {
        return request({
            url: `${baseUrl}/unpublishCourse/${courseId}`,
            method: 'post',
        })
    },
    updateCourseInfo(data) {
        return request({
            url: `${baseUrl}/updateCourseInfo`,
            method: 'post',
            data
        })
    }
}

export default course;