import { Message } from 'element-ui';
export function authPassword(rule, value, callback){
    if(value === ''){
        callback(new Error('请输入密码'));
    }
    else{
        const reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,20}$/;
        if(!reg.test(value)){
            callback(new Error('8-20位英文、数字、符号，至少包含两种，区分大小写'));
        }
    }
    callback()
}
export function authTel(rule,value,callback){
    if(value === ''){
        callback(new Error('请输入手机号'));
    }else{
        if(!(/^1[3456789]\d{9}$/.test(value))){
            callback(new Error('请输入正确的手机号'));
        }
    }
    callback();
}
export function alert(message, type) {
    Message({
        showClose: true,
        message,
        type,
    });
}