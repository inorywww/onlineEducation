/** 
 * api接口的统一出口
 */

import teacher from './teacher';
import oss from './oss';
import vod from './vod';
import subject from  './subject';
import course from  './course';
import chapter from  './chapter';
import video from  './video';
export default{
    teacher,
    oss,
    vod,
    subject,
    course,
    chapter,
    video,
}
