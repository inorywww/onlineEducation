<template>
    <div class="popular-teacher">
        <h1 class="title title-large">名师大咖</h1>
        <el-row :gutter="12" class="teacher-list">
            <el-col :span="6" 
            class="teacher-item" 
            v-for="(item, index) in teacherList"
            :key="index"
            >
                <div class="avatar">
                    <router-link :to="`teacher/${item.id}`" >
                        <img :src="item.avatar" alt="image" class="hvr-grow-rotate">
                    </router-link>
                </div>
                <div class="teacher-info">
                    <h1 class="name">{{item.name}}</h1>
                    <p class="career">{{item.career}}</p>
                    <p class="intro">{{item.intro}}</p>
                </div>
            </el-col>
        </el-row>
        <router-link class="all-teacher hvr-float-shadow" to="course">
            查看更多
        </router-link>
    </div>
</template>

<script>
import { indexMixin } from '@/utils/mixin';

export default {
    name:'popularTeacher',
    mixins:[indexMixin],
     computed:{
        teacherList(){
            return this.indexData.teacherList;
        }
    }
}
</script>

<style lang="scss" scoped>
.popular-teacher{
    margin: 20px 0;
    .title{
        text-align: center;
        margin: 20px 0;
    }
    .teacher-list{
        margin: 40px 0;
        .teacher-item{
            @include columnCenter;
            .avatar{
                width: 250px;
                height: 250px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .teacher-info{
                margin: 12px 0;
                @include columnCenter;
                width: 100%;
                .name{
                    font-size: $text-big;
                    margin: 8px 0;
                }
                .career{
                    margin: 12px 0 16px;
                    font-size: $text-medium;
                }
                .intro{
                    font-size: $text-medium;
                    padding: 16px 0;
                    text-align: center;
                    width: 90%;
                    border-top: 1px solid $bd-gray;
                }
            }
        }
    }
     .all-teacher{
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