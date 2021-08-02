const defaultAccount = 'admin'
const defaultPassword = '123456'
export function login(data){
    if(data.account === defaultAccount && data.password === defaultPassword){
        return true
    }else{
        return false;
    }
}