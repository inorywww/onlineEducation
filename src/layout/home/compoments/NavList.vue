<template>
    <div class="nav-list">
        <template v-for="(item, index) in navList">
            <template v-if="item.subs">
                <el-dropdown 
                :class="`nav-item ${index === active?'active':''}`" 
                :key="index"
                @click="changeActive(index)"
                >
                    <span class="hv-font-green">
                        {{ item.title }}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="(subItem, index1) in item.subs"
                            :key="index1"
                            class="hv-bg-green"
                        >
                            <router-link :to="subItem.path" class="link">
                                {{ subItem.title }}
                            </router-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
            <template v-else>
                <div 
                :class="`nav-item ${index === active?'active':''}`" 
                :key="index"
                @click="changeActive(index)"
                >
                    <router-link :to="item.path" class="link">
                        {{ item.title }}
                    </router-link>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: "navList",
    watch:{
        $route(to){
            this.active = this.navList.findIndex(item => item.path === to.path)
        }
    },
    data() {
        return {
            navList: [
                {
                    title: "首页",
                    path: "/index",
                },
                {
                    title: "全部课程",
                    path: "/course",
                },
                {
                    title: "名师",
                    path: "/teacher",
                },
                {
                    title: "学习路线图",
                    path: "",
                    subs: [
                        {
                            title: "Java开发",
                            path: "/path/java",
                        },
                        {
                            title: "大数据",
                            path: "/path/bigdata",
                        },
                        {
                            title: "前端开发",
                            path: "/path/front",
                        },
                        {
                            title: "Linux运维",
                            path: "/path/linux",
                        },
                        {
                            title: "Android",
                            path: "/path/android",
                        },
                    ],
                },
                {
                    title: "名师面授班",
                    path: "http://www.atguigu.com/",
                },
            ],
            active: 0,
        };
    },
    methods:{
        changeActive(index){
            this.active = index;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/global.scss";
.nav-list {
    @include left;
    height: 100%;
    .nav-item {
        @include center;
        height: 100%;
        width: px2rem(180);
        padding: 0 px2rem(8);
        color: $c-black;
        cursor: pointer;
        font-size: $text-small;
        .link{
            @include center;
            width: 100%;
            height: 100%;
        }
    }
    .active{
        background-color: $c-green;
        color: $c-white;
        & > a:hover {
            color:$c-white !important;
        }
    }
}
</style>