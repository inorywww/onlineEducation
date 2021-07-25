<template>
    <div class="course-all">
        
        <div class="action-box">
            <div class="filter-box">
                <div class="asTitle">
                <el-input 
                placeholder="根据课程名称搜索" 
                v-model="filterData.title" 
                @input="debounceSearch"
                clearable
                >
                </el-input>
            </div>
            <div class="asStatus">
                <el-select 
                v-model="filterData.status" 
                @change="conditionFilter" 
                placeholder="请选择状态"
                clearable
                >
                    <el-option v-for="(item,index) in allStatus" 
                    :key="index"
                    :label="item.statusName"
                    :value="item.status"
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
                    @change="conditionFilter"
                >
                </el-date-picker>
            </div>
            <el-button type="primary" class="filter" @click="conditionFilter">
                查询
            </el-button>
            </div>
            
            <div class="delAll">
                <el-button size="medium" type="danger" @click="delSelect">删除选中</el-button>
            </div>
        </div>
        <el-table :data="coursesInfo.rows" style="width:100%" @selection-change="changeSelect" stripe :max-height="maxHeight">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="expand" fixed>
                <template slot-scope="props">
                    <list-detail :props="props"/>
                </template>
            </el-table-column>
            <el-table-column label="课程名称" prop="title"> </el-table-column>
            <el-table-column label="课程状态" prop="statusName"> </el-table-column>
            <el-table-column label="课时数" prop="lessonNum"> </el-table-column>
            <el-table-column label="价格(元)" prop="price"> </el-table-column>
            <el-table-column label="所属讲师" prop="teacherName"> </el-table-column>
            <el-table-column label="创建时间" prop="gmtCreate"> </el-table-column>
            <el-table-column label="描述" prop="description"> </el-table-column>
            <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                    <span @change="scope">操作</span>
                </template>
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        @click="editCourse(scope.row)"
                        type="primary"
                        icon="el-icon-edit"
                        >修改</el-button
                    >
                    <el-button
                        size="medium"
                        type="danger"
                        @click="delCourse(scope.row)"
                        icon="el-icon-delete"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                @size-change="changeSize"
                @current-change="changePage"
                :page-size="pageSize"
                :page-sizes="pageSizes"
                layout="total, sizes, prev, pager, next, jumper"
                :total="coursesInfo.total"
                background
            >
            </el-pagination>
        </div>
        <template>
            <edit-dialog
            :info="info"
            @courseUpdate="getcourseUpdate"
            />
        </template>
    </div>
</template>

<script>
import ListDetail from './components/ListDetail.vue';
import { listMixin } from "@/utils/mixin";
import { alert } from "@/utils/index";
import moment from 'moment';
import EditDialog from './components/EditDialog';
let timer = null;
export default {
    components: { ListDetail, EditDialog },
    name: "courseAll",
    created(){
        this.filter();
    },
    mixins: [listMixin],
    data() {
        return {
            coursesInfo:[],
            allStatus:[{
                status:'Draft',
                statusName:'未发布'
            },{
                status:'Normal',
                statusName:'已发布'
            }
            ],
            pageSize: 5,
            maxHeight: window.outerHeight * 0.7,
            currentPageIndex: 1,
            pageSizes:[5, 10, 20, 30],
            filterData:{
                title:'',
                status:'',
                time:[]
            },
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
            selectItems:[],
            editDialogVisible:false,
            info:{}
        };
    },
    computed:{
       
    },
    methods:{
        filter(){
            if(this.filterData.status!=='' || this.filterData.title !== '' || this.filterData.time.length !== 0){
                this.conditionFilter();
            }else{
                this.pagefilter();
            }
        },
        pagefilter(){
            this.$api.course.pageCourse(this.currentPageIndex, this.pageSize)
                .then(res => {
                    if(res.data.code === 20000){
                        this.coursesInfo = res.data.data;
                        this.setCourseData();
                    }else{
                        alert('网络错误，请稍后重试！','error')
                    }
            });
        },
        conditionFilter(){
            const data = Object.assign({
                status: this.filterData.status || '',
                title: this.filterData.title || '',
                begin: '',
                end: ''
            });
            if(this.filterData.time && this.filterData.time.length === 2){
                data.begin = moment(this.filterData.time[0]).format('YYYY-MM-DD HH:mm:ss') 
                data.end = moment(this.filterData.time[1]).format('YYYY-MM-DD HH:mm:ss') 
            }
            this.$api.course.pageCourseCondition(data, this.currentPageIndex, this.pageSize)
                .then(res => {
                     if(res.data.code === 20000){
                        this.coursesInfo = res.data.data;
                        this.setCourseData();
                    }else{
                        alert('网络错误，请稍后重试！','error')
                    }
                })
        },
        editCourse(row){
            this.info = row;
            this.$store.commit('setCourseEditVisible', true)
        },
        // 获取更新后的数据
        getcourseUpdate(val){
            if(val){
                this.filter()
            }
        },
        delCourse(row){
            this.$confirm('此操作不可逆，要继续吗？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.course.delCourse(row.id).then(res => {
                    if(res.data.code === 20000){
                        alert('删除成功','success');
                        this.filter();
                    }else{
                        alert('删除失败，请稍后重试！','error');
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                }); 
            })
        },
        delSelect(){
            if(this.selectItems.length === 0){
                alert('当前未选中','info');
                return 
            }
            console.log(this.selectItems);
        },
        setCourseData(){
            this.coursesInfo.rows.forEach(item => {
                item.statusName = item.status==='Normal'?'已发布':'未发布';
                item.teacherName = this.allTeacher.find(t => item.teacherId === t.id)
                    ? this.allTeacher.find(t => item.teacherId === t.id).name:'null';
                const subjectParent =  this.allSubject.find(t => item.subjectParentId === t.id);
                item.subjectParentName = subjectParent?subjectParent.label:'null';
                const subject = subjectParent?subjectParent.children.find(t => item.subjectId === t.id):'';
                item.subjectName = subject?subject.label:'null';
            })
            // console.log(this.coursesInfo);
        },
        setUpdateCourseData(data){
            let subjectParent = null;
            let subject = null;
            // 判断是否更新了课程分类
            if(data.subject && data.subject.length !== 0){
                subjectParent = this.allSubject.find(item => item.value === data.subject[0]);
                subject = subjectParent.children.find(item => item.value === data.subject[1]);
                data.subjectParentName = subjectParent?subjectParent.label:'null';
                data.subjectName = subject?subject.label:'null';
            }
            data.statusName = data.status==='Normal'?'已发布':'未发布';
            data.teacherName = this.allTeacher.find(t => data.teacherId === t.id)
                ? this.allTeacher.find(t => data.teacherId === t.id).name:'null';
           
        },
        changeSelect(rows){
            this.selectItems = rows;
        },
        changeSize(val) {
            this.pageSize = val;
            this.filter()
        },
        changePage(index) {
            this.currentPageIndex = index;
            this.filter();
        },
        debounceSearch(){
            // 防抖
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.conditionFilter()
            }, 400)
        },
        
    }
};
</script>

<style lang="scss" scoped>
.course-all{
    .action-box{
        display: flex;
        justify-content: space-between;
        .filter-box{
            @include left;
            & > div{
                margin: 0 8px;
            }
        }
        .delAll{
            margin-right: 5%;
            text-align: right;
        }
    }
   
    .page{
        text-align: center;
        margin: 12px 0;
    }
}



.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>