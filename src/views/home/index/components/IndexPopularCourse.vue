<template>
    <div class="popular-course">
        <h1 class="title title-large">热门课程</h1>
        <el-row :gutter="12" class="course-list">
            <el-col :span="6" v-for="(item, index) in courseList" :key="index" class="course-item">
                <router-link :to="`course/${item.id}`">
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="cover">
                            <img :src="item.cover" alt="image">
                            <div class="mask">
                                <span class="start">开始学习</span>
                            </div>
                        </div>
                        <div class="body">
                            <h1 class="item-title">{{item.title}}</h1>
                            <div class="body-info">
                                <span :class="`isFree ${item.price === 0?'free':'paid'}`">
                                    {{item.price === 0?'免费':`￥${item.price}`}}
                                </span>
                                <div class="view-count">
                                    <span class="iconfont icon-bofangliang"></span>
                                    <span>{{item.viewCount}}</span>
                                </div>
                            </div>
                        </div> 
                    </el-card>
                </router-link>
            </el-col>
        </el-row>
        <router-link class="all-course hvr-float-shadow" to="/course">
            查看更多
        </router-link>
    </div>
</template>

<script>
import { indexMixin } from '@/utils/mixin';
export default {
    name:'popularCourse',
    mixins:[indexMixin],
    mounted(){
        setTimeout(() => {
            console.log(this.indexData);
        },1000)
    },
    computed:{
        courseList(){
            return this.indexData.courseList;
        }
    }
}
</script>

<style lang="scss" scoped>
.popular-course{
    margin: 64px 0;
    .title{
        text-align: center;
        margin: 20px 0;
    }
    .course-list{
        margin: 0 auto 20px;
        .course-item{
            padding-top: 8px;
            padding-bottom: 8px;
            &:hover img{
                transform: scale(1.1);
            }
            &:hover .mask{
                transform: translateY(-100%);
                background-color: rgba(0,0,0,.3);
            }
            .cover{
                overflow: hidden;
                position: relative;
                img{
                    transition: all .8s ease;
                }
                .mask{
                    @include center;
                    transition: all .5s ease;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    .start{
                        @include center;
                        width: 160px;
                        height: 40px;
                        color: $c-white;
                        background-color: transparent;
                        border-radius:30px;
                        margin: 0 auto;
                        border: $c-white solid 1px;
                        font-size: $text-medium;
                        transition: all .5s;
                    }
                }
            }
            .body{
                padding: 16px 12px;
                .item-title{
                    margin-bottom: 8px;
                    font-size: $text-small;
                }
                .body-info{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .view-count{
                        @include center;
                        .iconfont{
                            padding-right: 4px;
                        }
                    }
                }
                .free{
                    color: $c-green;
                }
                .paid{
                    color: $c-red;
                }
            }
        }
    }
    .all-course{
        @include center;
        width: 180px;
        height: 50px;
        color: $c-green;
        background-color: $c-white;
        border-radius:30px;
        margin: 0 auto;
        border: $c-green solid 1px;
        font-size: $text-medium;
        transition: all .5s;
    }
}
</style>