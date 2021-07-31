/** 
 * api接口的统一出口
 */

import teacher from './admin/teacher';
import oss from './admin/oss';
import vod from './admin/vod';
import subject from  './admin/subject';
import course from  './admin/course';
import chapter from  './admin/chapter'; 
import video from  './admin/video';
// 前台相关接口
import indexFront from './home/indexFront';
import user from './home/user';
import msm from './home/msm';
import courseFront from './home/courseFront';
import order from './home/order';
import payLog from './home/payLog';
export default{
    teacher,
    oss,
    vod,
    subject,
    course,
    chapter,
    video,
    indexFront,
    user,
    msm,
    courseFront,
    order,
    payLog,
}
