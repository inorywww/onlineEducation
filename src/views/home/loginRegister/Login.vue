<template>
  <div class="login">
        <el-form label-position="top" :rules="rules" ref="loginForm" :model="loginForm" >
            <el-form-item label="账号" prop="account">
                <el-input v-model="loginForm.account" placeholder="邮箱/手机/用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
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
import {alert} from '@/utils/index';
export default {
    name:'login',
    data(){
        return {
            loginForm:{
                account:'',
                password:'',
                remember:true,
            },
            rules: {
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码',trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        login(){
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    alert('submit!','success');
                } else {
                    alert('error submit!!','error');
                    return false;
                }
            });
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