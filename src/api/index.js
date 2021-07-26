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
export default{
    teacher,
    oss,
    vod,
    subject,
    course,
    chapter,
    video,
}
