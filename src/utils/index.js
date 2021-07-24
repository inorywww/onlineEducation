import {Message} from 'element-ui';
export function authPassword(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        const reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,20}$/;
        if (!reg.test(value)) {
            callback(new Error('8-20位英文、数字、符号，至少包含两种，区分大小写'));
        }
    }
    callback()
}
export function authTel(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入手机号'));
    } else {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
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

export function equalObj(a, b) {
    const classNameA = toString.call(a)
    const classNameB = toString.call(b)
    // 如果数据类型不相等，则返回false
    if (classNameA !== classNameB) {
        return false
    } else {
        // 如果数据类型相等，再根据不同数据类型分别判断
        if (classNameA === '[object Object]') {
            for (let key in a) {
                if (!equalObj(a[key], b[key])) return false
            }
            for (let key in b) {
                if (!equalObj(a[key], b[key])) return false
            }
            return true
        } else if (classNameA === '[object Array]') {
            if (a.length !== b.length) {
                return false
            } else {
                for (let i = 0, len = a.length; i < len; i++) {
                    if (!equalObj(a[i], b[i])) return false
                }
                return true
            }
        } else if (classNameA === '[object Function]') {
            return a.toString() === b.toString()
        } else {
            return Object.is(a, b)
        }
    }
}

