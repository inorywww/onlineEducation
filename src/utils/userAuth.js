import {
    setLocalStorage,
    removeLocalStorage,
    getLocalStorage
} from './localStorage';
const tokenKey = 'userToken';
export function setToken( value) {
    return setLocalStorage(tokenKey, value, {
        exp: 3600 * 24 * 15
    });
}

export function removeToken() {
    return removeLocalStorage(tokenKey);
}

export function getToken() {
    return getLocalStorage(tokenKey);
}