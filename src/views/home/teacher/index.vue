<template>
    <div class="teacher">
        <div class="title-box">
            <h1>全部讲师</h1>
            <span>全部</span>
        </div>
        <div class="container" v-if="allTeacher.length !== 0">
            <el-row :gutter="16" class="teacher-list" >
                <el-col :span="6" v-for="(item, index) in showData" :key="index">
                    <teacher-item :item="item"/>
                </el-col>
            </el-row>
            <div class="page">
                <el-pagination
                    @size-change="changeSize"
                    @current-change="changePage"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="allTeacher.length"
                    background
                    :hide-on-single-page="true"
                >
                </el-pagination>
            </div>
        </div>
        <no-data v-else/>
    </div>
</template>

<script>
import {listMixin} from '@/utils/mixin'
import TeacherItem from './components/TeacherItem.vue';
import NoData from '../components/NoData';
export default {
    name:'allTeacher',
    components:{
        TeacherItem,
        NoData
    },
    mixins:[listMixin],
    created(){
        const temp = this.allTeacher.concat();
        temp.forEach(item => this.allTeacher.push(item));
        temp.forEach(item => this.allTeacher.push(item));
        // temp.forEach(item => this.allTeacher.push(item));
        console.log('this.allTeacher', this.allTeacher);
    },
    data(){
        return {
            pageSize: 8,
            currentPageIndex: 1,
        }
    },
    updated(){
        // console.log(this.showData);
    },
    computed:{
        showData(){
            return this.allTeacher.slice(
                (this.currentPageIndex - 1) * this.pageSize,
                this.currentPageIndex * this.pageSize
            );
        },
    },
    methods:{
        changeSize(val) {
            this.pageSize = val;
        },
        changePage(index) {
            this.currentPageIndex = index;
        }
    }
}
</script>

<style lang="scss" scoped>
.teacher{
    max-width: $max-w;
    margin: 0 auto;
    .title-box{
        margin: 16px auto;;
        display: flex;
        border-bottom:$border;
        h1{
            font-size: $text-large;
        }
        span{
            font-size: $text-big;
            color: $cs-black;
            text-align: center;
            flex: 1
        }
    }
    .container{
        @include columnCenter;
        .teacher-list{
            width: 100%;
        }
        .page{
            margin: 12px 0 0;
        }
    }
}
</style>