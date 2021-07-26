<template>
    <div class="popular-course">
        <h1 class="title title-large">热门课程</h1>
        <el-row :gutter="20" class="course-list">
            <el-col :span="6"  v-for="(item, index) in courseList" :key="index">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="cover">
                        <img :src="item.cover" alt="image">
                    </div>
                    <div class="body">
                        <h1 class="item-title">{{item.title}}</h1>
                    </div> 
                </el-card>
            </el-col>
        </el-row>
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
    .course-list{
       
    }
}
</style>