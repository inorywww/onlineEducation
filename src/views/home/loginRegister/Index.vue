<template>
  <div class="container">
        <header class="login-tab">
            <router-link :class="showWho === 'login'?'active':''" to="/login">
                登录账号
            </router-link>
            <router-link :class="showWho === 'register'?'active':''" to="/register">
                注册账号
            </router-link>
        </header>
        <main class="login-main">
            <login v-if="showWho === 'login'"/>
            <register v-if="showWho === 'register'"/>
            <div class="login-way">
                <router-link class="qq iconfont icon-qq-blue" to="#">
                </router-link>
                <router-link class="wx iconfont icon-wx-green" to="#">
                </router-link>
            </div>
        </main>
  </div>
</template>

<script>
import Login from './Login'
import Register from './Register'
export default {
    name:'loginOrRegiser',
    components: { Login, Register },
    created(){
        if(this.$route.name === 'login'){
            this.showWho = 'login';
        }else if(this.$route.name === 'register'){
            this.showWho = 'register';
        }
    },
    watch:{
        $route(to){
            // 监听路由根据url判断显示login还是register
            if(to.name === 'login'){
                this.showWho = 'login';
            }else if(to.name === 'register'){
                this.showWho = 'register';
            }
        }
    },
    data(){
        return{
            showWho:'login',
        }
    }
}
</script>

<style lang="scss" scoped>
@import  '@/assets/style/global.scss';
.container{
    background-color: $c-white;
    width: 460px;
    min-height: 400px;
    margin: 50px auto;
    outline: 1px solid $bd-gray;
    padding-bottom: 28px;
    .active{
        background-color: $c-white !important;
    }
    .login-tab{
        @include center;
        justify-content: space-around;
        background-color: $bg-color;
        font-size: $text-medium;
        a{
            @include columnCenter;
            flex: 1;
            height: 64px;
            &:hover{
                color: $c-black !important;
            }
            &:hover:not(.active){
                background-color: $c-white;
                opacity: .7;
            }
        }
    }
    .login-way{
        @include center;
        margin: 0 32px 12px;
        border-bottom: 1px solid $bd-gray;
        .qq{
            color: $c-blue;
            font-size: 35px !important;
            &:hover{
                color: $c-white;
            }
        }
        .wx{
            color: $c-green;
            font-size: 40px !important;
            &:hover{
                color: $c-blue !important;
            }
        }
        a{
            margin: 20px 12px;
        }
    }
}
</style>