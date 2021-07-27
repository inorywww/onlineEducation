import {
    setLocalStorage,
    removeLocalStorage,
    getLocalStorage
} from './localStorage';
import CryptoJS from 'crypto-js'

const tokenKeyPwd = 'rememberPassword';
const tokenKeyTel = 'rememberTel';
export function setRememberPassword(value) {
    const pwd = encode(value);
    return setLocalStorage(tokenKeyPwd, pwd, {
        exp: 3600 * 12 * 15
    });
}
export function removeRememberPassword() {
    return removeLocalStorage(tokenKeyPwd);
}

export function getRememberPassword() {
    const key = getLocalStorage(tokenKeyPwd);
    return key ? decode(key) : key;
}
export function setRememberTel(value) {
    const tel = encode(value);
    return setLocalStorage(tokenKeyTel, tel, {
        exp: 3600 * 12 * 15
    });
}
export function removeRememberTel() {
    return removeLocalStorage(tokenKeyTel);
}

export function getRememberTel() {
    const key = getLocalStorage(tokenKeyTel);
    return key ? decode(key) : key;
}
// 加密
export function encode(s) {
    return CryptoJS.AES.encrypt(s, CryptoJS.SHA256('inoryww').toString()).toString()
}
//  解密
export function decode(s) {
    return CryptoJS.AES.decrypt(s, CryptoJS.SHA256('inoryww').toString()).toString(
      CryptoJS.enc.Utf8
    )
}