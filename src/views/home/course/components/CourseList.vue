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
export default {
    name:'courseList',
    props:{
        filterCondition:Object,
    },
    components: { CourseItem },
    created(){
        this.pagefilter();
        setTimeout(() => {
            console.log(this.showData);
            console.log('filterCondition',this.filterCondition);
            console.log('filterData',this.filterData);
        },500)
    },
    computed:{
        filterData(){
            let data = {
                pageNo:this.currentPageIndex,
                pageSize:this.pageSize,
                subjectId:this.filterCondition.subjectId,
                subjectParentId:this.filterCondition.subjectParentId
            }
            //升序为空 降序为'1' 默认为降序
            data[this.filterCondition.filterWay] = this.filterCondition.sortWay === 'desc'?'1':'';
            return data
        },
        
    },
    data(){
        return {
            showData:[],
            pageSize:3,
            currentPageIndex:1,
        }
    },
    methods:{
        pagefilter(){
            // this.$api.course.pageCourse(this.currentPageIndex, this.pageSize)
            //     .then(res => {
            //         if(res.data.code === 20000){
            //             this.showData = res.data.data;
            //             // const temp = res.data.data.rows.concat();
            //         }else{
            //             alert('网络错误，请稍后重试！','error')
            //         }
            // });
             this.$api.courseFront.getFilterCourse(this.filterData, this.currentPageIndex, this.pageSize)
                .then(res => {
                    if(res.data.code === 20000){
                        this.showData = res.data.data;
                        // console.log(res.data);
                    }else{
                        alert('网络错误，请稍后重试！','error')
                    }
            });
        },
        conditionFilter(){
            
        },
        changeSize(val) {
            this.pageSize = val;
            this.pagefilter();
        },
        changePage(index) {
            this.currentPageIndex = index;
            this.pagefilter();
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