<template>
    <header :class="`header ${headerStyle.name}`">
        <div class="nav">
            <div class="nav-left">
                <div class="logo">
                    <router-link to="/">
                        <img :src="headerStyle.logo" alt="logo" />
                    </router-link>
                </div>
                <div class="slogan">
                    <span class="slogan-t">谷粉力挺老学员推荐</span>
                    <span class="slogan-b">尚硅谷旗下线上平台</span>
                </div>
                <div class="nav-search">
                    <el-input placeholder="搜索课程" size="small">
                        <el-button
                            slot="append"
                            class="iconfont icon-seach"
                        ></el-button>
                    </el-input>
                </div>
            </div>
            <div class="nav-right">
                <nav-list/>
                <div class="nav-login" v-if="!isLogin">
                    <span class="iconfont icon-user"></span>
                    <router-link to="/login">登录</router-link>
                    <span>&emsp;/&emsp;</span>
                    <router-link to="/register">注册</router-link>
                </div>
                <div class="user-center" v-else>
                    <el-dropdown class="user-nav" >
                        <span class="el-dropdown-link">
                           个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                           <el-dropdown-item
                                v-for="(item, index) in userNav"
                                :key="index"
                                class="hv-bg-green"
                                @click.native="logOut(item)"
                            >
                                <router-link :to="item.path">
                                    {{ item.title }}
                                </router-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { removeToken } from "@/utils/userAuth";
import { alert } from '@/utils/index';
import NavList from './NavList';
export default {
    name: "headerBar",
    components:{
        NavList 
    },
    created() {},
    computed: {
        headerStyle(){
            return this.$store.state.headerStyle;
        },
        isLogin(){
            return this.$store.state.isLogin;
        },
    },
    data() {
        return {
            userNav:[
                {
                title:'我的学习',
                path:'/'
            },
                {
                title:'账户中心',
                path:'/'
            },
                {
                title:'退出登录',
                path:'/'
            },
            ]
        };
    },
    methods:{
        logOut(item){
            if(item.title === '退出登录'){
                this.$confirm('确定要退出登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeToken();
                    alert('已退出登录','info',1000);
                    this.$store.commit('setIsLogin');
                    setTimeout(() => {
                        this.$router.push('/login');
                    },1000)
                }).catch(() => alert('已取消','info'))
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/global.scss";

.header {
    height: 60px;
    .nav {
        @include left;
        justify-content: space-between;
        max-width: $max-w;
        height: 100%;
        margin: 0 auto;
        .nav-left {
            @include left;
            height: 65%;
            .logo {
                height: 100%;
                padding-right: px2rem(10);
                img {
                    height: 100%;
                    width: auto;
                }
            }
            .slogan {
                @include columnCenter;
                font-family: "楷体";
                font-size: $text-small;
                letter-spacing: 1px;
                border-left: 1px solid #efefef;
                padding-left: px2rem(20);
                .slogan-b {
                    margin-top: px2rem(5);
                    background-color: $c-green;
                    color: $c-white;
                }
            }
            .nav-search{
                margin-left:px2rem(100);
            }
        }
        .nav-right {
            @include center;
            height: 100%;
            .nav-login {
                margin:0 px2rem(100);
                a{
                    font-size:$text-small;
                    color:#7d7f7f;
                }
            }
            .user-center{
                cursor: pointer;
                margin: 0 20px;
            }
        }
       
    }
}
</style>