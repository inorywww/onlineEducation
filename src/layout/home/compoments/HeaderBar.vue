<template>
    <header class="header">
        <div class="nav">
            <div class="nav-left">
                <div class="logo">
                    <router-link to="/">
                        <img src="/images/logo.png" alt="logo" />
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
                <div class="nav-login">
                    <span class="iconfont icon-user"></span>
                    <router-link to="/login" class="hv-font-green">登录</router-link>
                    <span>&emsp;/&emsp;</span>
                    <router-link to="/login" class="hv-font-green">注册</router-link>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import NavList from './NavList.vue';
export default {
    name: "headerBar",
    components:{
        NavList 
    },
    created() {},
    computed: {
        navList() {
            return this.$store.state.navList;
        },
    },
    data() {
        return {
        };
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/global.scss";
.header {
    background-color: $c-white;
    height: 60px;
    border-bottom: 2px solid $c-green;
    .nav {
        @include left;
        justify-content: space-between;
        max-width: 1260px;
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
                color: $c-gray;
            }
        }
       
    }
}
</style>