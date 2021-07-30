<template>
    <div class="search">
        <div class="cloud-search-box">
            <input type="text" placeholder="可搜索课程、教师、分类" 
            class="search-input"
            @keyup.enter="search"
            v-model="keyword"
            >
            <span class="search-btn" @click="search">搜索</span>
        </div>
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="15" class="search-container">
                    <div class="tab-list">
                        <span
                        :class="`tab ${tabActive === index?'tab-active':''}`" 
                        v-for="(item, index) in searchTabs"
                        :key="index"
                        @click="changeTab(index)"
                        >
                        {{item.title}}
                        </span>
                    </div>
                    <search-course-list v-if="tabActive === 0"/>
                    <search-teacher-list v-if="tabActive === 1"/>
                </el-col>
                <el-col :span="8" class="recommend-container">
                   <recommend-course-list v-if="tabActive === 0"/>
                   <recommend-teacher-list v-if="tabActive === 1"/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import SearchCourseList from './SearchCourseList';
import SearchTeacherList from './SearchTeacherList';
import RecommendCourseList from './components/RecommendCourseList';
import RecommendTeacherList from './components/RecommendTeacherList';
import {searchMixin} from '@/utils/mixin';
export default {
    name:'search',
    mixins:[searchMixin],
    components: { 
        SearchCourseList, 
        SearchTeacherList,
        RecommendCourseList,
        RecommendTeacherList,
        },
    data(){
        return {
            searchList:[],
            searchTabs:[
                {
                    name:'course',
                    title:'课程'
                },
                {
                    name:'teacher',
                    title:'讲师'
                },
            ], //课程 老师
            tabActive:0
        }
    },
    mounted(){
        // this.$store.dispatch('getIndexData');
        const to = this.$route;
        if(to.params.category !== this.searchTabs[this.tabActive].name){
            this.tabActive = this.searchTabs.findIndex(item => item.name === to.params.category)
        }
        this.$store.commit('setSearchContent',to.params.keyword)
    },
    watch:{
        $route(to){
            if(to.params.category !== this.searchTabs[this.tabActive].name){
                this.tabActive = this.searchTabs.findIndex(item => item.name === to.params.category)
            }
            this.$store.commit('setSearchContent',to.params.keyword)
        }
    },
    methods:{
        changeTab(index){
            this.tabActive = index;
            if(this.$route.path !== `/search/${this.searchTabs[this.tabActive].name}/${this.keyword}`){
                this.$router.replace(`/search/${this.searchTabs[this.tabActive].name}/${this.keyword}`);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.search{
    .cloud-search-box{
        @include center;
        height: 200px;
        width: 100%;
        background: url("/images/banner_search.jpg") no-repeat;
        background-size: cover;
        .search-input{
            flex: .6;
            height: 48px;
            border: none;
            outline: none;
            padding-right: 50px;
            font-size: $text-medium;
            color: $c-black;
            border-top-left-radius: 4px !important;
            border-bottom-left-radius: 4px !important;
        }
        .search-btn{
            color: $c-white;
            background-color: $c-green;
            padding: 16px 30px;
            font-size: 14px;
            transition: all .3s ease;
            cursor: pointer;
            &:hover{
                color: $c-white !important;
                background-color: #389e51;
            }
        }
    }
    .container{
        max-width: $max-w;
        margin: 24px auto 0 ;
        .el-row{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .el-col{
            background-color: $c-white;
            border-radius: 4px;
            border:$border !important;
        }
        .search-container{
            .tab-list{
                padding: 0 12px;
                @include left;
                border-bottom: $border;
                .tab{
                    padding: 16px 32px;
                    text-align: center;
                    cursor: pointer;
                    font-size: $text-medium;
                    border-bottom:2px solid transparent;
                }
                .tab-active{
                    border-bottom: 2px solid $c-green;
                    color: $c-green;
                }
            }
        }
        .recommend-container{
        }
    }
}
</style>