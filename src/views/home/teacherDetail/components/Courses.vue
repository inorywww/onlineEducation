<template>
    <div class="courses">
        <div class="title">
            <h1>
                主讲课程
            </h1>
        </div>
        <div class="course-list">
           <el-row :gutter="20">
              <el-col :span="6" v-for="(item,index) in courseList" :key="index">
                    <router-link :to="`/course/${item.id}`">
                        <course-item :item="item"/>
                    </router-link>
              </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import CourseItem from '@/views/home/components/CourseItem';
export default {
    name:'courses',
    components:{
        CourseItem
    },
    props:{
        courseList:Array,
    }
}
</script>

<style lang="scss" scoped>
.courses{
    width: 100%;
    .title{
        border-bottom: $border;
        h1{
            font-size: $text-large;
            padding: 8px 16px;
        }
    }
    .course-list{
        margin: 12px 24px;
        a:hover{
            color: $c-black !important;
        }
    }
}
</style>