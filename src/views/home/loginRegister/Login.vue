<template>
  <div class="login">
        <el-form label-position="top" :rules="rules" ref="loginForm" :model="loginForm" >
            <el-form-item label="账号" prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <el-checkbox v-model="remember">记住密码</el-checkbox>
        </el-form>
        <div class="login-btn">
            <el-button type="primary" @click="login">登录</el-button>
        </div>
        <div class="action">
            <router-link class="findPwd t-green" to="/password/reset">
                找回密码
            </router-link>
            <span class="t-gray">| 还没有注册账号？</span>
            <router-link class="resigter t-green" to="/resigter">
                立即注册
            </router-link>
        </div>
        
  </div>
</template>

<script>
import { setToken, getToken } from "@/utils/userAuth";
import { alert,authTel } from '@/utils/index';
import { 
    setRememberPassword, 
    removeRememberPassword,
    getRememberPassword,
    setRememberTel, 
    removeRememberTel,
    getRememberTel,
    } from '@/utils/remember';
export default {
    name:'login',
    created(){
        this.$store.commit('setIsLogin');
        const rememberTel = getRememberTel();
        const rememberPasword = getRememberPassword();
        if(rememberTel && rememberPasword){
            this.loginForm.mobile = rememberTel;
            this.loginForm.password = rememberPasword;
        }
    },
    data(){
        return {
            loginForm:{
                mobile:'',
                password:'',
            },
            remember:true,
            rules: {
               mobile: [
                    { required: true, validator:authTel, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码',trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        login(){
            //没有登录的时候
            if(!getToken()){
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        this.$api.user.login(this.loginForm)
                        .then(res => {
                            if(res.data.code === 20000){
                                alert('登录成功！','success',1000);
                                setToken(res.data.data.token);
                                this.$store.commit('setIsLogin');
                                if(this.remember){
                                    this.setRemember();
                                }else{
                                    this.removeRemember();
                                }
                                setTimeout(() => {
                                    this.$router.push('/');
                                },1000)
                            }else{
                                alert('登录失败，账户或密码错误！','error')
                            }
                        });
                    } else {
                        alert('请正确填写字段！','error');
                        return false;
                    }
                });
            }else{
                alert('当前已登录，请勿重复登录！','warning')
            }
        },
        setRemember(){
            setRememberTel(this.loginForm.mobile);
            setRememberPassword(this.loginForm.password);
        },
        removeRemember(){
            removeRememberTel();
            removeRememberPassword();
        }
    }
}
</script>

<style lang="scss" scoped>
@import  '@/assets/style/global.scss';
.login{
    padding: 16px 0 0;
    margin: 0 auto;
    width: 70%;
    .login-btn{
        width: 100%;
        padding: 16px 0;
        .el-button{
            width: 100%;
        }
    }
    .action{
        a,span{
            padding: 0 8px;
        }
    }
    
}
</style>