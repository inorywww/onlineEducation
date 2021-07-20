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
                <div class="nav-login">
                    <span class="iconfont icon-user"></span>
                    <router-link to="/login">登录</router-link>
                    <span>&emsp;/&emsp;</span>
                    <router-link to="/register">注册</router-link>
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
        headerStyle(){
            return this.$store.state.headerStyle;
        }
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
        }
       
    }
}
</style>