/*
 * 接口域名的管理
 */
const baseHttp = "http://localhost:8001/eduservice/";
const base = {    
    user: baseHttp + 'user',
    teacher: baseHttp + 'teacher',    
    subject: baseHttp + 'subject',
    course: baseHttp + 'course',
    oss: 'http://localhost:8002/eduoss',
}

export default base;