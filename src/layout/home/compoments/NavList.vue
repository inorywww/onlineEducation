<template>
    <div class="nav-list">
        <template v-for="(item, index) in navList">
            <template v-if="item.subs">
                <el-dropdown class="nav-item" :key="index">
                    <span class="hv-font-green">
                        {{ item.title }}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="(subItem, index1) in item.subs"
                            :key="index1"
                            class="hv-bg-green"
                        >
                            <router-link :to="subItem.path">
                                {{ subItem.title }}
                            </router-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
            <template v-else>
                <div class="nav-item" :key="index">
                    <router-link :to="item.path">
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
    data() {
        return {
            navList: [
                {
                    title: "首页",
                    path: "/index",
                },
                {
                    title: "全部课程",
                    path: "/course/explore",
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
        };
    },
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
    }
    .nav-item:first-child {
        background-color: $c-green;
        color: $c-white;
        & > a:hover {
            color: $c-black !important;
        }
    }
}
</style>