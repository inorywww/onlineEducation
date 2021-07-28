<template>
    <div class="popular-teacher">
        <h1 class="title title-large">名师大咖</h1>
        <teacher-list :teacherList="teacherList"/>
        <router-link class="all-teacher hvr-float-shadow" to="/teacher">
            查看更多
        </router-link>
    </div>
</template>

<script>
import { indexMixin } from '@/utils/mixin';
import TeacherList from './TeacherList'
export default {
    name:'popularTeacher',
    mixins:[indexMixin],
    components:{
        TeacherList
    },
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