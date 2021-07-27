/**
 * 首页相关接口
 */
import request from '../request';
import base from './base';
const baseUrl = base.index;

const indexFront = {
    // 获取首页热门课程和老师
    index(){
        return request({
            url: `${baseUrl}/index`,
            method:'get',
        })
    }
}
export default indexFront