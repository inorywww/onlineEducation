<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="top-list">
                <div
                    class="top-item"
                    v-for="(item, index) in topList"
                    :key="index"
                >
                    <img :src="item.imgUrl" alt="image" />
                    <span class="title">{{ item.content }}</span>
                </div>
            </div>

            <div class="bottom-list">
                <div
                    class="bottom-item"
                    v-for="(item, index) in bottomList"
                    :key="index"
                >
                    <span class="subTitle">{{ item.title }}</span>
                    <div class="item-list">
                        <router-link
                            v-for="(subItem, index1) in item.subs"
                            :key="index1"
                            :to="subItem.path"
                        >
                            {{ subItem.content }}
                        </router-link>
                    </div>
                </div>
                <div class="bottom-right">
                    <img
                        src="https://www.gulixueyuan.com/themes/june/img/wx.png"
                        alt="image"
                    />
                    <p>关注尚硅谷微信</p>
                    <p>一键下载全部视频教程</p>
                </div>
            </div>
        </div>
        <div class="copyright">
            课程版权均归
            <router-link to="/" class="hv-font-green"> 谷粒学苑 </router-link>
            所有
            <a href="https://beian.miit.gov.cn/" class="hv-font-green"> 京ICP备17055252号 </a>
            <img
                src="https://www.gulixueyuan.com/themes/june/img/icon_jh.png"
                alt="image"
            />
            <span class="hv-font-green">京公网安备11011402011204号</span>
            <a href="https://www.gulixueyuan.com/page/jyxkz" class="hv-font-green">经营许可证</a>
            <a href="https://www.gulixueyuan.com/page/yyzz" class="hv-font-green">营业执照</a>
            <a href="https://www.gulixueyuan.com/page/chengnuo" class="hv-font-green">依法合规经营承诺</a>
        </div>
    </footer>
</template>

<script>
export default {
    name: "footerBar",
    data() {
        return {
            topList: [
                {
                    imgUrl: "https://www.gulixueyuan.com/themes/june/img/bot1.png",
                    content: "业界大牛亲自授课",
                },
                {
                    imgUrl: "https://www.gulixueyuan.com/themes/june/img/bot2.png",
                    content: "前沿技术实时更新",
                },
                {
                    imgUrl: "https://www.gulixueyuan.com/themes/june/img/bot3.png",
                    content: "足不出户学编程",
                },
            ],
            bottomList: [
                {
                    title: "新手入门",
                    subs: [
                        {
                            content: "新用户注册",
                            path: "/register",
                        },
                        {
                            content: "用户登录",
                            path: "/login",
                        },
                        {
                            content: "找回密码",
                            path: "/password/reset",
                        },
                    ],
                },
                {
                    title: "关于我们",
                    subs: [
                        {
                            content: "名师团队",
                            path: "http://www.atguigu.com/teacher.shtml",
                        },
                        {
                            content: "视频下载",
                            path: "http://www.atguigu.com/download.shtml",
                        },
                        {
                            content: "合作企业",
                            path: "https://tb.53kf.com/code/client/10007377/1",
                        },
                    ],
                },
                {
                    title: "资源下载",
                    subs: [
                        {
                            content: "视频下载",
                            path: "http://www.atguigu.com/download.shtml",
                        },
                        {
                            content: "资料下载",
                            path: "http://www.atguigu.com/opensource.shtml",
                        },
                        {
                            content: "工具下载",
                            path: "http://www.atguigu.com/opensource.shtml#2",
                        },
                    ],
                },
                {
                    title: "联系我们",
                    subs: [
                        {
                            content: "工作机会",
                            path: "https://www.51job.com/",
                        },
                        {
                            content: "招贤纳师",
                            path: "http://www.atguigu.com/join.shtml",
                        },
                        {
                            content: "联系方式",
                            path: "https://www.gulixueyuan.com/page/contacts",
                        },
                    ],
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/global.scss";
.footer {
    margin-top: 20px;
    bottom: 64px;
    width: 100%;
    height: 424px;
    background-color: $cs-black;
    @media (max-width: 999px) {
        display: none;
    }
    .footer-container {
        max-width: 1000px;
        height: 360px;
        margin: 0 auto;
        .top-list {
            @include center;
            height: 40%;
            color: $c-white;
            font-size: $text-medium;
            border-bottom: 1px solid $bd-gray;
            .top-item {
                @include center;
                width: 80%;
                .title {
                    margin-left: 16px;
                }
            }
            .top-item:not(:last-child) {
                border-right: 1px solid $bd-gray;
            }
        }
        .bottom-list {
            @include left;
            height: 60%;
            justify-content: space-evenly;
            .bottom-item {
                @include columnLeft;
                .subTitle {
                    color: $c-white;
                    font-size: $text-medium;
                    margin-bottom: 8px;
                }
                .item-list {
                    @include columnLeft;
                    a {
                        font-size: $text-small;
                        color: $cs-gray;
                        margin: 8px 0;
                    }
                }
            }
            .bottom-right {
                font-size: $text-tiny;
                color: $c-gray;
                text-align: center;
                p {
                    margin: 4px auto;
                }
            }
        }
    }
    .copyright {
        @include center;
        background-color: #2a2a2a;
        width: 100%;
        height: 64px;
        color: $c-gray;
        font-size: $text-small;
        a{
            color: $c-gray;
        }
        a:not(:first-child){
            margin: 0 6px;
        }
    }
}
</style>