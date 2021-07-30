<template>
    <div class="search">
        <div class="cloud-search-box">
            <input type="text" placeholder="可搜索课程、教师、分类" 
            class="search-input"
            @keyup.enter="search"
            >
            <span class="search-btn">搜索</span>
        </div>
        <div class="container">
            <el-row>
                <el-col :span="16" class="search-container">
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
                    <search-teacher-list v-if="tabActive === 0"/>
                    <search-course-list v-if="tabActive === 1"/>
                </el-col>
                <el-col :span="8" class="recommend-container">
                    <search-recommend/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import SearchCourseList from './components/SearchCourseList';
import SearchRecommend from './components/SearchRecommend';
import SearchTeacherList from './components/SearchTeacherList';
import {searchMixin} from '@/utils/mixin';
export default {
    name:'search',
    mixins:[searchMixin],
    components: { SearchCourseList, SearchRecommend, SearchTeacherList },
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
    methods:{
        changeTab(index){
            this.tabActive = index;
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
        height: 200px;
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