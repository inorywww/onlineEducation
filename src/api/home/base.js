/*
 * 接口域名的管理
 */

const http = "http://localhost:9001"
const baseHttp = http + "/eduservice";
const userBaseHttp = http + "/educenter";
const msmBaseHtp = http + "/edumsm";
const base = {
    // 下面是前台相关接口
    index: baseHttp + '/indexfront',
    member: userBaseHttp + '/member',
    msm: msmBaseHtp + '/msm',
    courseFront:baseHttp + '/coursefront'
}

export default base;