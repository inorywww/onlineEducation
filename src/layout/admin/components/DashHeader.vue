<template>
    <div class="headerbar-container">
        <div class="header-left">
            <div class="hamburger" @click="changeShow">
                <span :class="sidebarIcon"></span>
            </div>
            <div class="breadNav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <router-link to="/dashboard/index">
                            首页
                        </router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item 
                        v-for="(item, index) in breadTitles" 
                        :key="index"
                    >
                        <router-link :to="item.path">
                            {{item.title}}
                        </router-link>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="header-right userInfo">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    个人信息<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <router-link to="/">前台首页</router-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: "dashHeader",
    data() {
        return {
            sidebarIcon:'el-icon-s-fold'
        };
    },
    computed:{
        breadTitles(){
            const bs = this.$route.matched.filter(item => {
                return item.meta.title;
            });
            let res = [];
            bs.forEach(item => {
                res.push({
                    name:item.name,
                    path:item.path,
                    title:item.meta.title
                })
            })
            return res;
        }
    },
    methods: {
        changeShow() {
            this.$store.commit('setIsCollapse',!this.$store.state.isCollapse)
            this.sidebarIcon = 
                this.sidebarIcon === "el-icon-s-fold"
                ? "el-icon-s-unfold"
                : "el-icon-s-fold";
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.headerbar-container{
    display: flex;
    justify-content:space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: $c-white;
    box-shadow: 0 5px 10px -5px #ccc;
    border-bottom: 1px solid #ccc;
    .header-left{
        @include center;
        .hamburger span{
            font-size: $text-big;
            margin:0 8px;
        }
    }
    .header-right{
        margin-right: 16px;
    }
}
</style>