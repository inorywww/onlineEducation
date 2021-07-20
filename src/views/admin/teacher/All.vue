<template>
    <div class="teacher-all">
        <el-table
            :data="showTeachers"
            style="width: 100%"
            border
        >
            <el-table-column align="center" label="序号" prop="id"></el-table-column>
            <el-table-column align="center" label="姓名" prop="name"> </el-table-column>
            <el-table-column label="头衔" prop="career"> </el-table-column>
            <el-table-column label="简介" prop="intro"> </el-table-column>
            <el-table-column label="添加时间" prop="gmtCreate"> </el-table-column>
            <el-table-column label="排序" prop="sort"> </el-table-column>
            <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="searchContent"
                        size="mini"
                        placeholder="输入关键字搜索"
                        @change="scope"
                    />
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
    </div>
</template>

<script>
import { listMixin } from "@/utils/mixin";
export default {
    name: "teacherAll",
    mixins: [listMixin],
    async created() {
        console.log(this.allTeachers);
    },
    data() {
        return {
            searchContent:''
        };
    },
    computed: {
        showTeachers() {
            return this.allTeachers;
        },
    },
    methods:{
        editTeacher(index, row){
            console.log(index,row);
        },
        delTeacher(index,row){
            console.log(index,row);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>