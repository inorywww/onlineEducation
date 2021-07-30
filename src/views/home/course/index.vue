<template>
    <div class="course">
        <div class="title-box">
            <h1>全部课程</h1>
            <div class="more">
                <a>查看班级</a>
                <a>查看公开课</a>
            </div>
        </div>
        <div class="content">
            <div class="tabs-container">
                <div class="tabs-bread">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item @click.native="init" class="hv-font-green">全部</el-breadcrumb-item>
                        <el-breadcrumb-item 
                        @click.native="changeBread(item)"
                        v-for="(item, index) in breads"
                        :key="index"
                        class="hv-font-green">
                        {{item.label}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="tabs-group">
                    <h2>课程类别：</h2>
                    <div class="list">
                        <span 
                        :class="`tabs-item hv-font-green ${activeIndex===-1?'active':''}`" 
                        @click="init">
                            全部
                        </span>
                        <span 
                        v-for="(item, index) in allSubject"
                        :key="index"
                        :class="`tabs-item hv-font-green ${activeIndex===index?'active':''}`"
                        @click="changeSubject(item,index)">
                            {{item.label}}
                        </span>
                    </div>
                </div>
                <div class="tabs-group" v-show="activeIndex !== -1">
                    <h2 style="opacity:0">课程类别：</h2>
                    <div class="list">
                        <span 
                        :class="`tabs-item hv-font-green ${subIndex===-1?'active':''}`" 
                        @click="initSub">
                            全部
                        </span>
                        <span
                        :class="`tabs-item hv-font-green ${subIndex===index?'active':''}`"
                        v-for="(item, index) in subs"
                        :key="index"
                        @click="changeSub(item,index)"
                        >
                            {{item.label}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="filter-container">
                <div class="sort-filter">
                    <span 
                    :class="filterIndex === index?'filterActive':''"
                    v-for="(item, index) in filter"
                    :key="index"
                    @click="changeFilter(index)"
                    >
                    {{item.name}}
                    <i :class="filterIndex === index?sortWay.icon:''"></i>
                    </span>
                </div>
                <div class="isFree-filter">
                    <el-radio-group v-model="isFree">
                        <el-radio label="-1" @change="sonKey = Date.now()">全部</el-radio>
                        <el-radio label="0" @change="sonKey = Date.now()">免费课程</el-radio>
                        <el-radio label="1" @change="sonKey = Date.now()">付费课程</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <course-list :key="sonKey" :filterCondition="filterData"/>
        </div>
    </div>
</template>

<script>
import {listMixin} from '@/utils/mixin'
import CourseList from './components/CourseList.vue';

export default {
    name:'allCourse',
    mixins:[listMixin],
    components:{
        CourseList
    },
    data(){
        return {
            breads:[],
            activeIndex:-1,
            subIndex: -1,
            filterIndex:0,
            filter:[
                {
                    name:'最热',
                    way:'buyCountSort'
                },
                {
                    name:'最新',
                    way:'gmtCreatSort'
                },
                {
                    name:'价格',
                    way:'priceSort'
                },
            ],
            sonKey:Date.now(),
            sortWay:{
                //desc:降序 asc:升序
                way: 'desc',
                icon: 'el-icon-arrow-down'
            },
            isFree:'-1', //筛选全部，免费，付费
        }
    },
    computed:{
        subs(){
            if(this.activeIndex === -1){
                return [];
            }
            const items = this.allSubject[this.activeIndex].children;
            if(items && items.length !== 0){
                return items
            }
            return [];
        },
        filterData(){
            const subjectParentId = this.activeIndex !== -1?this.allSubject[this.activeIndex].id:'';
            const subjectId = this.subIndex !== -1?this.allSubject[this.activeIndex].children[this.subIndex].id:''
            return {
                filterWay:this.filter[this.filterIndex].way,
                sortWay:this.sortWay.way,
                subjectParentId,
                subjectId,
                price:this.isFree
            }
        },
    },
    updated(){
        console.log(this.isFree);
    },
    methods:{
        changeBread(item){
            if(item.children){
                this.activeIndex = item.index;
                this.subIndex = -1;
                this.breads.splice(1,1);
                this.sonKey = Date.now();
            }
        },
        changeSubject(item,index){
            this.activeIndex = index;
            this.subIndex = -1;
            this.sonKey = Date.now();
            item['index'] = index;
            if(this.breads.length === 0){
                this.breads.push(item);
            }else{
                this.breads.splice(0,1,item);
                this.breads.splice(1,1);
            }
        },
        changeSub(item,index){
            this.subIndex = index;
            this.sonKey = Date.now();
            if(this.breads.length === 1){
                this.breads.push(item);
            }else{
                this.breads.splice(1,1,item)
            }
        },
        changeFilter(index){
            if(index === this.filterIndex){
                this.sortWay.way = this.sortWay.way==='desc'?'asc':'desc'
                this.sortWay.icon = this.sortWay.icon==='el-icon-arrow-down'?'el-icon-arrow-up':'el-icon-arrow-down'
            }else{
                this.sortWay.way = 'desc'
                this.sortWay.icon = 'el-icon-arrow-down'
            }
            this.filterIndex = index;
            this.sonKey = Date.now();
        },
        init(){
            this.activeIndex = -1;
            this.subIndex = -1;
            this.breads = [];
            this.sonKey = Date.now();
        },
        initSub(){
            this.subIndex = -1;
            this.breads.splice(1,1);
            this.sonKey = Date.now();
        }
    }
}
</script>

<style lang="scss" scoped>
.course{
    max-width: $max-w;
    margin: 0 auto;
    .title-box{
        padding: 16px 0;;
        display: flex;
        justify-content: space-between;
        h1{
            font-size: $text-large;
        }
        .more{
            height: 100%;
            @include center;
            a{
                color: $c-white;
                background-color: $c-green;
                height: 100%;
                padding: 16px 30px;
                font-size: 14px;
                margin: 0 4px;
                transition: all .3s ease;
                cursor: pointer;
                &:hover{
                    color: $c-white !important;
                    background-color: #389e51;
                }
            }
        }
    }
    .content{
        margin: 20px 0;
        .tabs-container{
            margin:0 auto;
            background-color: $c-white;
            border: $border;
            .tabs-bread{
                @include left;
                height: 64px;
                margin: 0 16px;
            }
            .tabs-group{
                border-top: dashed 1px $bd-gray;
                @include left;
                padding: 0 24px;
                h2{
                    font-size: $text-small;
                    color: $cs-black;
                }
                .list{
                    @include left;
                    flex-wrap: wrap;
                    width: 80%;
                    padding: 12px;
                    .tabs-item{
                        flex:0 1 100px;
                        padding: 10px 12px;
                        font-size: $text-small;
                        text-align: center;
                    }
                }
            }
            .active{
                color:$c-green;
            }
        }
        .filter-container{
            @include left;
            justify-content: space-between;
            margin: 20px 0;
            .sort-filter{
                span{
                padding: 12px 20px;
                cursor: pointer;
                }
                .filterActive{
                    background-color: $c-green;
                    color: $c-white;
                }
            }
        }
    }
}
</style>