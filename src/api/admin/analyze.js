/**
 * 后台统计数据相关接口
 */
 import request from '../request';
 import base from './base';
 import moment from 'moment';
 const baseUrl = base.analyze;
 const defaultBegin = '2021-01-01 00:00:00'
 const defaultEnd = moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')

 const analyze = {
     // 统计某一天注册人数
    registerCount(day){
        return request({
            url:`${baseUrl}/registerCount/${day}`,
            method: 'get',
        })
    },
    //指定类型和时间段，获取时间段中相关的统计数据
    //login_num register_num video_view_num course_num
    //不传时间段的话就是获取全部数据
    showData(type, begin = defaultBegin, end = defaultEnd){
        return request({
            url:`${baseUrl}/showData/${type}/${begin}/${end}`,
            method: 'get',
        })
    }
 }
 export default analyze