<template>
    <div class="list-container">
        <div class="total">
            为您找到约
            <span>{{showData.total}}</span>
            条结果
        </div>
        <div class="list" v-if="showData.total !== 0">
            <template v-for="(item, index) in showData.rows">
                <search-course-item :key="index" :item="item"/>
            </template>
        </div>
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
import SearchCourseItem from './components/SearchCourseItem';
import {pageMixin} from '@/utils/mixin';
import NoData from '../components/NoData';

export default {
    name:'searchList',
    components: { SearchCourseItem, NoData },
    mixins:[pageMixin],
    data(){
        return {
            showData: [],
            pageSize: 5
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
                title:to.params.title,
            }
            this.$store.commit('setSearchContent',to.params.title)
            this.$api.courseFront.getFilterCourse(data, this.currentPageIndex, this.pageSize).then(res =>{
                this.showData = res.data.data;
                this.setKeyword();
            });
        },
        setKeyword(){
            const keyword = this.$store.state.searchContent;
            if(keyword && keyword.length > 0 && this.showData.rows.length > 0){
                this.showData.rows.forEach(item => {
                    const replaceReg = new RegExp(keyword, 'g');
                    const replaceTitle ='<span class="keyword">' + keyword + '</span>';
                    item.title = item.title.replace(replaceReg, replaceTitle);
                    item.description = item.description.replace(replaceReg, replaceTitle);
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