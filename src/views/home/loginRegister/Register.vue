<template>
  <div class="register">
       <el-form label-position="top" :rules="rules" ref="registerForm" :model="registerForm">
            <el-form-item label="手机号码" prop="tel">
                <el-input v-model="registerForm.tel" placeholder="填写常用手机号作为登录账号"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username" placeholder="中英文均可，最长18个英文或者9个汉字"></el-input>
            </el-form-item>
             <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" placeholder="8-20位英文、数字、符号，至少包含两种，区分大小写"></el-input>
            </el-form-item>
             <el-form-item label="短信验证码" prop="smsAuth">
                <div class="authBox">
                    <el-input v-model="registerForm.smsAuth" placeholder="填写短信验证码"></el-input>
                    <el-button type="info" class="auth" :disabled="isAuth">获取验证码</el-button>
                </div>
            </el-form-item>
        </el-form>
        <div class="register-btn">
            <el-button type="primary" :disabled="!isRead" @click="register">注册</el-button>
        </div>
        <el-checkbox v-model="isRead" class="read">
            我已阅读
            <router-link to="https://www.gulixueyuan.com/userterms">《用户隐私协议》</router-link>
            和
            <router-link to="https://www.gulixueyuan.com/privacyPolicy">《协议政策》</router-link>
        </el-checkbox>
  </div>
</template>

<script>
import {authPassword, authTel, alert} from '@/utils/index';

export default {
    name:'register',
    data(){
        return {
            registerForm:{
                tel:'',
                username:'',
                password:'',
                smsAuth:'',
            },
            isAuth:true,
            isRead:false,
            rules: {
                tel: [
                    { required: true, validator:authTel, trigger: 'blur' },
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { max: 18, message: '字符长度必须小于等于18', trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: authPassword, trigger: 'blur' },
                ],
                smsAuth: [
                    { required: true, message: '请填写短信验证码', trigger: 'blur' },
                    {min: 6, max: 6, message: '请正确填写短信验证码', trigger: 'blur' },
                ],
            }
        }
    },
    watch:{
        deep:true,
        'registerForm.tel'(val){ // 验证手机号，如果正确就开放验证按钮
            if(/^1[3456789]\d{9}$/.test(val)){
                this.isAuth = false;
            }else{
                this.isAuth = true;
            }
        },
        
    },
    methods:{
        register(){
            this.$refs['registerForm'].validate((valid) => {
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
.register{
    padding: 16px 0 0;
    margin: 0 auto;
    width: 70%;
    .authBox {
        display: flex;
    }
    .register-btn{
        width: 100%;
        padding: 4px 0;
        .el-button{
            width: 100%;
        }
    }
    .read{
        a{
            color: $c-green !important;
        }
    }
}
</style>