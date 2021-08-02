/**
 * 轮播图管理
 */
 import request from '../request';
 import base from './base';
 const baseUrl = base.banner;
 const frontBanner = baseUrl + '/bannerfront'
 const adminBanner = baseUrl + '/banneradmin'
 const banner = {
    //获取所有轮播图
    getAllBanner(){
        return request({
            url:`${frontBanner}/getAllBanner`,
            method: 'get',
        })
    },
    //添加轮播图
    addBanner(data){
        return request({
            url:`${adminBanner}/addBanner`,
            method: 'post',
            data
        })
    },
    //获取某个banner
    getBanner(id){
        return request({
            url:`${adminBanner}/get/${id}`,
            method: 'get',
        })
    },
    // 分页查询banner
    pageBanner(no,size){
        return request({
            url:`${adminBanner}/pageBanner/${no}/${size}`,
            method: 'get',
        })
    },
    // 删除某个banner
    delBanner(id){
        return request({
            url:`${adminBanner}/remove/${id}`,
            method: 'delete',
        })
    },
    //修改
    updateBanner(data){
        return request({
            url:`${adminBanner}/update`,
            method: 'put',
            data
        })
    }
 }
 export default banner