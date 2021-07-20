<template>
    <div class="teacher-all">
        <div class="filter">
            <div class="asTeacher">
                <el-input
                    v-model="filterData.name"
                    placeholder="根据姓名查找"
                ></el-input>
                <el-select
                    v-model="filterData.career"
                    placeholder="根据头衔查找"
                    clearable
                >
                    <el-option
                        v-for="item in allCareer"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="asTime">
                <el-date-picker
                    v-model="filterData.time"
                    type="daterange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                >
                </el-date-picker>
            </div>
            <el-button type="primary" class="filter" @click="filter">
                查询
            </el-button>
        </div>
        <el-table :data="teachersInfo.rows" style="width: 100%" border>
            <el-table-column label="序号" prop="id"></el-table-column>
            <el-table-column label="姓名" prop="name"> </el-table-column>
            <el-table-column label="头衔" prop="career"> </el-table-column>
            <el-table-column label="简介" prop="intro"> </el-table-column>
            <el-table-column label="添加时间" prop="gmtCreate">
            </el-table-column>
            <el-table-column label="排序" prop="sort"> </el-table-column>
            <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                    <span @change="scope">操作</span>
                </template>
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        @click="editTeacher(scope.$index, scope.row)"
                        class="iconfont"
                        >修改</el-button
                    >
                    <el-button
                        size="medium"
                        type="danger"
                        @click="delTeacher(scope.$index, scope.row)"
                        >Delete</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="changeSize"
            @current-change="changePage"
            :page-size="pageSize"
            :page-sizes="[5, 10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="teachersInfo.total"
            background
        >
        </el-pagination>
    </div>
</template>

<script>
import moment from 'moment';
import { listMixin } from "@/utils/mixin";
export default {
    name: "teacherAll",
    mixins: [listMixin],
    async created() {
        await this.pagefilter();
    },
    data() {
        return {
            filterData: {
                name: "",
                career: "",
                time: [],
            },
            pageSize: 5,
            currentPageIndex: 1,
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近半年",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30 * 6
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一年",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30 * 12
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                     {
                        text: "最近两年",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30 * 24
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            teachersInfo:{
                total:0,
                items:[]
            },
        };
    },
    computed: {
        allCareer() {
            return [...new Set(this.allTeachers.map((item) => item.career))];
        },
    },
    methods: {
        editTeacher(index, row) {
            console.log(index, row);
        },
        delTeacher(index, row) {
            console.log(index, row);
        },
        async pagefilter(){
           await this.$api.teacher.pageTeacher(this.currentPageIndex, this.pageSize)
                .then(res => this.teachersInfo = res.data.data);
        },
        async conditionFilter(){
            console.log(this.filterData);
            const data = {
               name:this.filterData.name || "",
               career:this.filterData.career || "",
               begin: "",
               end: "",
            }
            if(this.filterData.time.length === 2){
                data.begin = moment(this.filterData.time[0]).format('YYYY-MM-DD HH:mm:ss') 
                data.end = moment(this.filterData.time[1]).format('YYYY-MM-DD HH:mm:ss') 
            }
            console.log(data);
            await this.$api.teacher.pageTeacherCondition(data,this.currentPageIndex, this.pageSize)
                .then(res => this.teachersInfo = res.data.data);
        },
        filter(){
            for (const key in this.filterData) {
                if(this.filterData[key].length !== 0){
                    console.log(this.filterData[key]);
                }
            }
            this.conditionFilter();
        },
        changeSize(val) {
            this.pageSize = val;
            this.pagefilter();
        },
        changePage(index) {
            this.currentPageIndex = index;
            this.pagefilter();
        },
    },
};
</script>

<style lang="scss" scoped>
.teacher-all {
    .filter {
        @include right;
        margin:4px 50px 4px 0;
        .asTeacher {
            @include left;
            margin: 0 12px;
            .el-input{
                margin: 0 8px;
            }
        }
        .asTime{
            margin: 0 12px;
        }
    }
    .el-pagination {
        text-align: center;
        margin: 8px auto;
    }
}
</style>