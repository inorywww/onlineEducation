/*
 * 接口域名的管理
 */
const baseHttp = "/eduservice";
const userBaseHttp = "/educenter";
const msmBaseHtp = "/edumsm";
const orderBaseHtp = "/eduorder";
const base = {
    // 下面是前台相关接口
    index: baseHttp + '/indexfront',
    member: userBaseHttp + '/member',
    msm: msmBaseHtp + '/msm',
    courseFront:baseHttp + '/coursefront',
    order: orderBaseHtp + '/order',
    payLog: orderBaseHtp + '/paylog'
}

export default base;