<template>
    <div class="swiper">
        <el-carousel trigger="click" height="460px">
            <el-carousel-item
                class="swiper-item"
                v-for="(item, index) in swiperList"
                :key="index"
            >
                <img :src="item.imageUrl" alt="image" />
            </el-carousel-item>
        </el-carousel>
        <div class="category-container">
            <ul class="category-content">
                <li v-for="(item, index1) in categroyList" :key="index1">
                    <div class="left"
                    @mouseenter.self="showSub(index1)"
                    @mouseleave.self="subShowIndex = -1"
                     >
                        <div class="title">{{ item.title }}</div>
                        <p class="content">
                            <router-link
                                class="hv-font-green"
                                v-for="(link, index2) in item.links"
                                :key="index2"
                                :to="`/course/${link.id}`"
                            >
                                {{ link.name }}
                            </router-link>
                        </p>
                    </div>
                   
                    <div class="sub-list" 
                    @mouseenter.self="showSub(index1)"
                    @mouseleave.self="subShowIndex = -1"
                    v-show="subShowIndex === index1"
                    >
                        <div class="sub-item" 
                            v-for="(subItem, index2) in item.subs"
                            :key="index2"
                        >
                            <template v-if="subItem.title !=='课程推荐'">
                                <p class="sub-title">{{ subItem.title }}</p>
                                <div class="sub-content">
                                    <router-link
                                        class="hv-font-green"
                                        v-for="(link, index3) in subItem.links"
                                        :key="index3"
                                        :to="`/course/${link.id}`"
                                    >
                                        {{ link.name }}
                                    </router-link>
                                </div>
                            </template>
                            <template v-else>
                                <p class="sub-title">{{ subItem.title }}</p>
                                <div class="recommend">
                                    <router-link
                                    class="hv-font-red"
                                    v-for="(link, index3) in subItem.links"
                                    :key="index3"
                                    :to="`/course/${link.id}`"
                                >
                                        <span class="recommend-name">
                                            {{ link.name }}
                                        </span>
                                        <span class="recommend-content">
                                            {{link.content}}
                                        </span>
                                    </router-link>
                                </div>
                            </template>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {listMixin} from '@/utils/mixin';
export default {
    name: "indexSwiper",
    created() {
        this.getBanners(); 
    },
    mixins:[listMixin],
    data() {
        return {
            subShowIndex:-1,
            swiperList: [
                
            ],
            categroyList: [
                {
                    title: "Java",
                    links: [
                        {
                            id: 34,
                            name: "JavaSE",
                        },
                        {
                            id: 34,
                            name: "SpringBoot",
                        },
                        {
                            id: 34,
                            name: "SpringMVC",
                        },
                        {
                            id: 34,
                            name: "MyBat",
                        },
                    ],
                    subs: [
                        {
                        title: "Java",
                        links: [
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                        ],
                        },
                        {
                        title: "课程推荐",
                        links: [
                            {
                                id: 34,
                                name: "Spring",
                                content:'Spring4视频教程'
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                                content:"涵盖企业开发技术点、源码级讲授"
                            },
                            {
                                id: 34,
                                name: "MyBatis",
                                content:"源码级讲授的MyBatis视频"
                            },
                            {
                                id: 34,
                                name: "Redis",
                                content:"常用的NoSQL数据库技术"
                            },
                            
                        ],
                        },
                    ]
                },
                {
                    title: "H5前端",
                    links: [
                        {
                            id: 34,
                            name: "JavaSE",
                        },
                        {
                            id: 34,
                            name: "SpringBoot",
                        },
                        {
                            id: 34,
                            name: "SpringMVC",
                        },
                        {
                            id: 34,
                            name: "MyBat",
                        },
                    ],
                    subs: [
                        {
                        title: "前端基础",
                        links: [
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                        ],
                        },
                        {
                        title: "前端高级",
                        links: [
                            {
                                id: 34,
                                name: "Spring",
                                content:'Spring4视频教程'
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                                content:"涵盖企业开发技术点、源码级讲授"
                            },
                            {
                                id: 34,
                                name: "MyBatis",
                                content:"源码级讲授的MyBatis视频"
                            },
                            {
                                id: 34,
                                name: "Redis",
                                content:"常用的NoSQL数据库技术"
                            },
                            
                        ],
                        },
                         {
                        title: "常用工具",
                        links: [
                            {
                                id: 34,
                                name: "Spring",
                                content:'Spring4视频教程'
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                                content:"涵盖企业开发技术点、源码级讲授"
                            },
                            {
                                id: 34,
                                name: "MyBatis",
                                content:"源码级讲授的MyBatis视频"
                            },
                            {
                                id: 34,
                                name: "Redis",
                                content:"常用的NoSQL数据库技术"
                            },
                            
                        ],
                        },
                    ]
                },
                 {
                    title: "Java",
                    links: [
                        {
                            id: 34,
                            name: "JavaSE",
                        },
                        {
                            id: 34,
                            name: "SpringBoot",
                        },
                        {
                            id: 34,
                            name: "SpringMVC",
                        },
                        {
                            id: 34,
                            name: "MyBat",
                        },
                    ],
                    subs: [
                        {
                        title: "Java",
                        links: [
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                        ],
                        },
                        {
                        title: "课程推荐",
                        links: [
                            {
                                id: 34,
                                name: "Spring",
                                content:'Spring4视频教程'
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                                content:"涵盖企业开发技术点、源码级讲授"
                            },
                            {
                                id: 34,
                                name: "MyBatis",
                                content:"源码级讲授的MyBatis视频"
                            },
                            {
                                id: 34,
                                name: "Redis",
                                content:"常用的NoSQL数据库技术"
                            },
                            
                        ],
                        },
                    ]
                },
                {
                    title: "H5前端",
                    links: [
                        {
                            id: 34,
                            name: "JavaSE",
                        },
                        {
                            id: 34,
                            name: "SpringBoot",
                        },
                        {
                            id: 34,
                            name: "SpringMVC",
                        },
                        {
                            id: 34,
                            name: "MyBat",
                        },
                    ],
                    subs: [
                        {
                        title: "前端基础",
                        links: [
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                        ],
                        },
                        {
                        title: "前端高级",
                        links: [
                            {
                                id: 34,
                                name: "Spring",
                                content:'Spring4视频教程'
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                                content:"涵盖企业开发技术点、源码级讲授"
                            },
                            {
                                id: 34,
                                name: "MyBatis",
                                content:"源码级讲授的MyBatis视频"
                            },
                            {
                                id: 34,
                                name: "Redis",
                                content:"常用的NoSQL数据库技术"
                            },
                            
                        ],
                        },
                         {
                        title: "常用工具",
                        links: [
                            {
                                id: 34,
                                name: "Spring",
                                content:'Spring4视频教程'
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                                content:"涵盖企业开发技术点、源码级讲授"
                            },
                            {
                                id: 34,
                                name: "MyBatis",
                                content:"源码级讲授的MyBatis视频"
                            },
                            {
                                id: 34,
                                name: "Redis",
                                content:"常用的NoSQL数据库技术"
                            },
                            
                        ],
                        },
                    ]
                },
                 {
                    title: "Java",
                    links: [
                        {
                            id: 34,
                            name: "JavaSE",
                        },
                        {
                            id: 34,
                            name: "SpringBoot",
                        },
                        {
                            id: 34,
                            name: "SpringMVC",
                        },
                        {
                            id: 34,
                            name: "MyBat",
                        },
                    ],
                    subs: [
                        {
                        title: "Java",
                        links: [
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                        ],
                        },
                        {
                        title: "课程推荐",
                        links: [
                            {
                                id: 34,
                                name: "Spring",
                                content:'Spring4视频教程'
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                                content:"涵盖企业开发技术点、源码级讲授"
                            },
                            {
                                id: 34,
                                name: "MyBatis",
                                content:"源码级讲授的MyBatis视频"
                            },
                            {
                                id: 34,
                                name: "Redis",
                                content:"常用的NoSQL数据库技术"
                            },
                            
                        ],
                        },
                    ]
                },
                {
                    title: "H5前端",
                    links: [
                        {
                            id: 34,
                            name: "JavaSE",
                        },
                        {
                            id: 34,
                            name: "SpringBoot",
                        },
                        {
                            id: 34,
                            name: "SpringMVC",
                        },
                        {
                            id: 34,
                            name: "MyBat",
                        },
                    ],
                    subs: [
                        {
                        title: "前端基础",
                        links: [
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                            {
                                id: 34,
                                name: "Spring4",
                            },
                            {
                                id: 34,
                                name: "Struts2",
                            },
                            {
                                id: 34,
                                name: "Hibernate",
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                            },
                        ],
                        },
                        {
                        title: "前端高级",
                        links: [
                            {
                                id: 34,
                                name: "Spring",
                                content:'Spring4视频教程'
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                                content:"涵盖企业开发技术点、源码级讲授"
                            },
                            {
                                id: 34,
                                name: "MyBatis",
                                content:"源码级讲授的MyBatis视频"
                            },
                            {
                                id: 34,
                                name: "Redis",
                                content:"常用的NoSQL数据库技术"
                            },
                            
                        ],
                        },
                         {
                        title: "常用工具",
                        links: [
                            {
                                id: 34,
                                name: "Spring",
                                content:'Spring4视频教程'
                            },
                            {
                                id: 34,
                                name: "SpringMVC",
                                content:"涵盖企业开发技术点、源码级讲授"
                            },
                            {
                                id: 34,
                                name: "MyBatis",
                                content:"源码级讲授的MyBatis视频"
                            },
                            {
                                id: 34,
                                name: "Redis",
                                content:"常用的NoSQL数据库技术"
                            },
                            
                        ],
                        },
                    ]
                },
            ],
            bannerList:[]
        };
    },
    methods:{
        showSub(index){
            this.subShowIndex = index;
        },
        getBanners(){
            this.$api.banner.pageBanner(1, 10).then(res =>this.swiperList = res.data.data.items);
        }
    }

};
</script>

<style lang="scss" scoped>
@import "@/assets/style/global.scss";
.swiper {
    position: relative;
    .el-carousel {
        .swiper-item {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .category-container {
        width: $max-w;
        height: 100%;
        
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0; 
        margin: auto;
        &,a, p {
            color: $c-white;
            text-overflow: ellipsis;
        }
        .category-content {
            height: 100%;
            position: relative;
            width: 245px;
            @include columnLeft;
            z-index: 1000;
            & > li {
                flex: 1;
                .left:hover{
                    background-color: $c-white;
                    opacity: 1;
                    &, a, p {
                        color: $c-black;
                    }
                }
                .left{
                    background: $c-black;
                    opacity: 0.7;
                    padding: 0 8px;
                    height: 100%;
                    transition: all .3s;
                    @include columnLeft;
                    .title {
                        font-size: $text-medium;
                        margin-bottom: 8px;
                    }
                    .content {
                        font-size: $text-tiny;
                        a {
                            padding-right: 4px;
                        }
                    }
                }
                
                .sub-list {
                    @include columnLeft;
                    position: absolute;
                    height: 100%;
                    width: 560px;
                    top: 0;
                    left: 100%;
                    background: #fff;
                    opacity: 0.9;
                    overflow: hidden;
                    .sub-item:not(:last-child){
                        border-bottom: 1px solid $cs-gray;
                    }
                    .sub-item{
                        flex:1;
                        margin:16px;
                        width: 93%;
                        
                        .sub-title{
                            font-size: $text-big;
                            color: $c-green;
                            padding-bottom: 16px;
                        }
                        .sub-content{
                            @include left;
                            flex-wrap: wrap;
                            a{
                                display: block;
                                margin: 8px;
                                color: $c-black;
                                font-size: $text-small;
                            }
                        }
                        .recommend{
                            @include columnLeft;
                            & > a {
                                margin: 12px;
                                .recommend-name{
                                    background-color: #f3f5f7;
                                    margin-right: 12px;
                                    color: $c-red;
                                    padding: 4px 12px;
                                    border-radius: 4px;
                                }
                                .recommend-content{
                                    color: $c-black;
                                    font-size: $text-small;
                                }
                            }
                            
                        }
                    }
                   
                }
            }
        }
    }
}
</style>