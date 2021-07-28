<template>
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
</template>

<script>
export default {
    name:'teacherList',
    props:{
        teacherList:Array,
    }
}
</script>

<style lang="scss" scoped>
.teacher-list{
    margin: 40px 0;
    .teacher-item{
        @include columnCenter;
        .avatar{
            width: 200px;
            height: 200px;
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
                color: $c-gray;
                margin: 12px 0 16px;
                text-align: center;
                font-size: $text-medium;
                display: inline-block;
                white-space: nowrap;
                width: 100%;
                overflow: hidden;
                text-overflow:ellipsis;
            }
            .intro{
                color: $c-gray;
                font-size: $text-medium;
                padding: 16px 0;
                text-align: center;
                width: 90%;
                border-top: 1px solid $bd-gray;
            }
        }
    }
}
</style>