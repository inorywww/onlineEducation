<template>
    <div class="admin-conatiner">
        <el-container class="admin-container">
            <el-aside>
                <dash-side/>
            </el-aside>
            <el-container>
                <el-header>
                    <dash-header/>
                </el-header>
                <transition name="slide-up" mode="out-in">
                    <el-main>
                        <tabs/>
                        <keep-alive>
                            <router-view/>
                        </keep-alive>
                    </el-main>
                </transition>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import DashHeader from './components/DashHeader';
import DashSide from './components/DashSide';
import Tabs from './components/Tabs'
export default {
    name:'layoutAdmin',
    components:{
        DashHeader,
        DashSide,
        Tabs,
    },
    created(){
        this.$store.commit("setCurrentView", this.$route.name);
    },
    watch:{
        $route(to){
            this.$store.commit("setCurrentView", to.name);
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-conatiner{
    width: 100%;
    height: 100%;
    .el-aside {
        width: auto !important;
    }
    .el-header {
        padding: 0 !important;
    }
    .el-main {
        padding: 4px 0 !important;
    }
}
</style>