<template>
    <div class="teacher-detail">
        <base-info :item="teacherInfo"/>
        <courses :courseList="courseList"/>
    </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import Courses from './components/Courses';
export default {
    name:'teacherDeatail',
    components:{
        BaseInfo,
        Courses
    },
    created(){
        this.getTeacherInfo();
    },
    data(){
        return {
            teacherInfo:{},
            courseList:[],
        }
    },
    watch:{
        $route(to){
            if(to.name === 'teacherDetail'){
                this.getTeacherInfo();
            }
        }
    },
    methods:{
        async getTeacherInfo(){
            const teacherId = this.$route.params.id;
            await this.$api.teacher.findTeacherById(teacherId).then(res => this.teacherInfo = res.data.data.teacher);
            await this.$api.teacher.getTeacherCourse(teacherId).then(res => this.courseList = res.data.data.courseList);
        }
    }
}
</script>

<style lang="scss" scoped>
.teacher-detail{
    max-width: $max-w;
    margin: 24px auto 0;
}
</style>