<template>
    <div class="sidebar-container">
        <el-menu 
        router
        :default-active="currentView"
        class="sidebar"
        :collapse="this.$store.state.isCollapse"
        unique-opened
        background-color="#304156"
        text-color="#fff"
        active-text-color="#3D9EF4"
        >
            <div class="sidebar-title">
                <h2 v-show="!this.$store.state.isCollapse">后台管理系统</h2>
            </div>
            <template v-for="(item, index) in navItems">
                <template v-if="item.subs">
                    <el-submenu :index="item.name" :key="index">
                        <template slot="title">
                            <i :class="`iconfont ${item.icon}`"></i>
                            <span>&emsp;{{ item.title }}</span>
                        </template>
                        <template>
                            <el-menu-item
                                @click="changeMenu(sub)"
                                v-for="(sub, sindex) in item.subs"
                                :index="sub.name"
                                :key="sindex"
                                :route="{path: sub.path}"
                                class="submenu-item"
                            >
                                <i :class="`iconfont ${item.icon}`"></i>
                                <span>&emsp;{{ sub.title }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item 
                    :index="item.name" 
                    :key="index" 
                    @click="changeMenu(item)"
                    :route="{path: item.path}"
                    >
                        <i :class="`iconfont ${item.icon}`"></i>
                        <span>&emsp;{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "dashSide",
    data() {
        return {
             navItems: [
                {
                    icon: "icon-51",
                    title: "首页",
                    name: "dashIndex",
                    path:'/dashboard/index'
                },
                {
                    icon: "icon-jiaolian1",
                    title: "讲师管理",
                    name: "teacher",
                    path: "/dashboard/teacher/list",
                    subs: [
                        {
                            title: "讲师列表",
                            name: "teacher-list",
                            path: "/dashboard/teacher/list",
                        },
                        {
                            title: "添加讲师",
                            name: "teacher-add",
                            path: "/dashboard/teacher/add",
                        },
                    ],
                },
                {
                    icon: "icon-kecheng",
                    title: "课程分类管理",
                    name: "subject",
                    path: "/dashboard/subject/list",
                    subs: [
                        {
                            title: "课程分类列表",
                            name: "subject-list",
                            path: "/dashboard/subject/list",
                        },
                        {
                            title: "添加课程分类",
                            name: "subject-add",
                            path: "/dashboard/subject/add",
                        },
                    ],
                }
            ],
        }
    },
    computed: {
        currentView(){
            return this.$store.state.currentView;
        },
    },
    methods:{
        changeMenu(item) {
            const obj = {
                title: item.title,
                name: item.name,
                path: item.path,
            };
            // 添加tab
            this.$store.commit("addTab", obj);
            // this.currentView  = obj.name;
        }
    },
    updated(){
    }
};
</script>

<style lang="scss" scoped>
.sidebar:not(.el-menu--collapse) {
    width: 200px;
}

.sidebar-container{
    height: 100vh;
    .sidebar{
        height: 100%;
        .sidebar-title{
            @include center;
            background-color: #2b2f3a;
            border-bottom: 1px solid #2b2f3a;
            h2{
                color:$c-white;
                padding: 16px;
                font-size: $text-big;
                font-weight: bold !important;
            }
        }
    }
}
</style>