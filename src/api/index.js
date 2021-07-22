/** 
 * api接口的统一出口
 */

// 老师的api
import teacher from './teacher';
import oss from './oss';
import subject from  './subject'
export default{
    teacher,
    oss,
    subject,
}
