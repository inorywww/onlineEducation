<template>
    <div class="container">
        <div class="course-list">
            <el-row :gutter="20">
              <el-col :span="6" v-for="(item,index) in showData.rows" :key="index">
                    <router-link :to="`/course/${item.id}`">
                        <course-item :item="item"/>
                    </router-link>
              </el-col>
            </el-row>
        </div>
        <div class="page">
            <el-pagination
                @size-change="changeSize"
                @current-change="changePage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="showData.total"
                background
                :hide-on-single-page="true"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import CourseItem from './CourseItem.vue';
import {pageMixin} from '@/utils/mixin';
export default {
    name:'courseList',
    props:{
        filterCondition:Object,
    },
    mixins:[pageMixin],
    components: { CourseItem },
    computed:{
        filterData(){
            let data = {
                pageNo:this.currentPageIndex,
                pageSize:this.pageSize,
                subjectId:this.filterCondition.subjectId,
                subjectParentId:this.filterCondition.subjectParentId,
                price:this.filterCondition.price
            }
            //升序为空 降序为'1' 默认为降序
            data[this.filterCondition.filterWay] = this.filterCondition.sortWay === 'desc'?'1':'';
            return data
        },
    },
    methods:{
        pagefilter(){
             this.$api.courseFront.getFilterCourse(this.filterData, this.currentPageIndex, this.pageSize)
                .then(res => {
                    if(res.data.code === 20000){
                        this.showData = res.data.data;
                    }else{
                        alert('网络错误，请稍后重试！','error')
                    }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.course-list a:hover{
    color: $c-black !important;
}
.page{
    margin: 20px 0 0;
    text-align: center; 
}
</style>