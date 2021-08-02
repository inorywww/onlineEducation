<template>
   <div class="login" clearfix>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="formData" :rules="rules" status-icon label-width="80px">
          <h3>登录</h3>
          <hr>
          <el-form-item prop="account" label="用户名">
            <el-input v-model="formData.account" placeholder="请输入用户名" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="formData.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="login">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { alert } from "@/utils/index";
import { login } from "@/api/admin/login";
export default {
    name: "login",
    data() {
        return {
            formData: {
                account: "",
                password: "",
            },
            rules: {
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码',trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        authLoginInfo() {
            if (this.formData.account.length === 0) {
                alert("账号不能为空哦~", "error");
                return false;
            }
            if (this.formData.password.length === 0) {
                alert("密码不能为空哦~", "error");
                return false;
            }
            return true;
        },
        login() {
             this.$refs['loginForm'].validate(valid =>{
                if(valid){
                    if(login(this.formData)){
                        this.$store.commit('setAdminIsLogin',true)
                        this.$router.push('/dashboard');
                    }else{
                        alert('账户或密码错误！','error');
                    }
                }else{
                    alert('请正确填写表单！')
                }
             })
        },
    },
};
</script>

<style scoped>

.login {
  width: 100%;
  height: 740px;
  background-color: #eee;
  overflow: hidden;
}
.login-wrap {
  /* background: url("../assets/images/login_bg.png") no-repeat; */
  background-color: #fff;
  width: 400px;
  height: 300px;
  margin: 215px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}
#password {
  margin-bottom: 5px;
}
h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}
a {
  text-decoration: none;
  color: #aaa;
  font-size: 15px;
}
a:hover {
  color: coral;
}
.el-button {
  width: 80%;
  margin: 16px 0 0 16px;
}
</style>