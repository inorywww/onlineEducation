/*
 * 接口域名的管理
 */
const baseHttp = "http://localhost:8001/eduservice/";
const base = {    
    user: baseHttp + 'user',
    teacher: baseHttp + 'teacher',    
    subject: baseHttp + 'subject',
    course: baseHttp + 'course',
    chapter:baseHttp + 'chapter',
    video:baseHttp + 'video',
    oss: 'http://localhost:8002/eduoss',
    vod: 'http://localhost:8003/eduvod/video',
}

export default base;