<template>
    <div class="course-detail" v-if="isData">
        <div class="header">
            <div class="bread">

            </div>
            <base-info :item="courseInfo" :isBuy="isBuy"/>
        </div>
        <div class="content">
            <div class="courseInfo">
                <course-info :course="courseInfo" :chapters="chapters" :isBuy="isBuy"/>
            </div>
            <div class="teacherInfo">
                <teacher-info :course="courseInfo"/>
            </div>
        </div>
    </div>
</template>

<script>
import BaseInfo from './components/BaseInfo';
import { alert } from "@/utils/index";
import CourseInfo from './components/CourseInfo';
import TeacherInfo from './components/TeacherInfo';
export default {
    name:'courseDetail',
    components:{
        BaseInfo,
        CourseInfo,
        TeacherInfo
    },
    created(){
        this.getCourseInfo();
    },
    watch:{
        $route(to){
            if(to.name === 'courseDetail'){
                this.getCourseInfo();
            }
        }
    },
    data(){
        return {
            courseInfo:[],
            chapters:[],
            isBuy:false,
            isData:false
        }
    },
    methods:{
        getCourseInfo(){
            console.log(this.$route.params.id);
            this.$api.courseFront.getCourseDetail(this.$route.params.id).then(res => {
                console.log(res.data.data);
                if(res.data.code === 20000){
                    this.courseInfo = res.data.data.courseWebVo;
                    this.chapters = res.data.data.chapterVideoList;
                    this.isBuy = res.data.data.isBuy;
                    this.isData = true;
                    document.title = `课程详情 - ${this.courseInfo.title} - 谷粒学苑 - Java培训|大数据培训|前端培训|HTML5培训|Linux运维培训_程序员一站式IT在线学习平台`
                }
                else{
                    alert('获取课程信息失败！','error')
                }
            })
        },
        checkIsBuy(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
.course-detail{
    max-width: $max-w;
    margin: 24px auto 0;
    .content{
        @include top;
        .courseInfo{
            width: 60%;
            padding-right:16px;
        }
        .teacherInfo{
            width: 40%;
            padding-left:16px;
        }
    }
}
</style>