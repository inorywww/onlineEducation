/*
 * 接口域名的管理
 */
const http = "http://localhost:9001"
const baseHttp = http + "/eduservice";
const ossHttp = http
const vodHttp = http + "/eduvod";
const bannerHttp = http + "/educms";
const analyzeHttp = http + '/staservice';
const base = {    
    user: baseHttp + '/user',
    teacher: baseHttp + '/teacher',     
    subject: baseHttp + '/subject',
    course: baseHttp + '/course',
    chapter: baseHttp + '/chapter',
    video: baseHttp + '/video',
    oss: ossHttp + '/eduoss',
    vod: vodHttp + '/video',
    banner: bannerHttp,
    analyze: analyzeHttp + '/sta'
}

export default base;