/*
 * 接口域名的管理
 */
const baseHttp = "/eduservice";
const ossHttp = baseHttp
const vodHttp = "/eduvod";
const bannerHttp = "/educms";
const analyzeHttp = '/staservice';
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