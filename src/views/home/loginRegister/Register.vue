<template>
  <div class="register">
       <el-form label-position="top" :rules="rules" ref="registerForm" :model="registerForm">
            <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="registerForm.mobile" placeholder="填写常用手机号作为登录账号"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="nickname">
                <el-input v-model="registerForm.nickname" placeholder="中英文均可，最长18个英文或者9个汉字"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" type="password" placeholder="8-20位英文、数字、符号，至少包含两种，区分大小写"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
                <el-input v-model="registerForm.rePassword" type="password" placeholder="8-20位英文、数字、符号，至少包含两种，区分大小写"></el-input>
            </el-form-item>
             <el-form-item label="短信验证码" prop="code">
                <div class="authBox">
                    <el-input v-model="registerForm.code" placeholder="填写短信验证码"></el-input>
                    <el-button type="info" class="auth" :disabled="isAuth" @click="getMSM">获取验证码</el-button>
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
                nickname:'',
                mobile:'',
                password:'',
                rePassword:'',
                code:'',
            },
            isRead:false,
            rules: {
                nickname: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { max: 18, message: '字符长度必须小于等于18', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, validator:authTel, trigger: 'blur' },
                ],
                password: [
                    { required: true, validator: authPassword, trigger: 'blur' },
                ],
                rePassword:[
                    { required: true, validator: this.passwordIsEqual, trigger: 'change' },
                ],
                code: [
                    { required: true, message: '请填写短信验证码', trigger: 'blur' },
                    {min: 4, max: 4, message: '请正确填写短信验证码', trigger: 'blur' },
                ],
            }
        }
    },
    computed:{
        isAuth(){
            if(/^1[3456789]\d{9}$/.test(this.registerForm.mobile)){
                return false
            }
            return true;
        },
    },
    methods:{
        register(){
            this.$refs['registerForm'].validate((valid) => {
                if (valid) {
                    alert('submit!','success');
                    this.$api.user.register(this.registerForm).then(res => {
                        console.log(res);
                        if(res.data.code === 20000){
                            alert('注册成功！即将跳到登录页面');
                            setTimeout(() => {
                                this.$router.push('login');
                            },1000)
                        }else{
                            alert('注册失败！请稍后重试！')
                        }
                    })
                } else {
                    alert('请正确输入字段！','error');
                    return false;
                }
            });
        },
        getMSM(){
            this.$api.msm.send(this.registerForm.mobile).then(res => {
                if(res.data.code === 20000){
                    alert('发送验证码成功！');
                }else{
                    alert('发送验证码失败！请稍后重试！')
                }
            })
        },
        passwordIsEqual(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
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