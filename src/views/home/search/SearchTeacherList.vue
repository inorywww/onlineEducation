<template>
    <div class="list-container">
        <div class="total">
            为您找到约
            <span>{{showData.total}}</span>
            条结果
        </div>
        <el-row class="list" :gutter="12" v-if="showData.total !== 0">
            <el-col :span="8" v-for="(item, index) in showData.rows" :key="index">
                <search-teacher-item :item="item"/>
            </el-col>
        </el-row>
        <no-data v-else/>
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
import {pageMixin} from '@/utils/mixin';
import SearchTeacherItem from './components/SearchTeacherItem';
import NoData from '../components/NoData';

export default {
    name:'teacherList',
    components:{SearchTeacherItem,NoData},
    mixins:[pageMixin],
    data(){
        return {
            showData:[],
            pageSize:3,
            currentPageIndex:1,
        }
    },
    watch:{
        $route(){
            this.pagefilter();
        }
    },
    methods:{
        pagefilter(){
            const to = this.$route;
            const data = {
                name:to.params.keyword,
            }
            this.$api.teacher.pageTeacherCondition(data, this.currentPageIndex, this.pageSize).then(res =>{
                this.showData = res.data.data;
                this.setKeyword()
            });
        },
        setKeyword(){
            const keyword = this.$store.state.searchContent;
            if(keyword && keyword.length > 0 && this.showData.rows.length > 0){
                this.showData.rows.forEach(item => {
                    const replaceReg = new RegExp(keyword, 'g');
                    const replaceTitle ='<span class="keyword">' + keyword + '</span>';
                    item.name = item.name.replace(replaceReg, replaceTitle);
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list-container{
    margin: 24px 0;
    padding: 0 12px;
    .total{
        padding: 12px;
        font-size: $text-medium;
        background-color: $bg-color;
        span{
            color: $c-red;
        }
    }
    .list{
        margin: 12px;
    }
    .page{
        margin: 20px 0 0;
        text-align: center; 
    }
}
</style>