<template>
    <div class="edit-dialog">
        <el-dialog title="收货地址" :visible.sync="dialogVisible">
            <div class="title-tab">
                <el-tabs type="border-card" @tab-click="changeTab">
                    <el-tab-pane label="编辑课程信息">
                        <edit-course-info :editInfo="courseInfo"/>
                    </el-tab-pane>
                    <el-tab-pane label="编辑大纲信息">
                        <edit-chapter-info :editInfo="chapterInfo"/>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="update-btn">
                <el-button type="primary" @click="update">修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { alert } from "@/utils/index";
import EditChapterInfo from './EditChapterInfo';
import EditCourseInfo from './EditCourseInfo';
export default {
    components: { EditCourseInfo, EditChapterInfo },
    name:'editDialog',
    data(){
        return {
            shows:['编辑课程信息','编辑大纲信息'],
            activeIndex: 0,
            courseInfo:{},
            chapterInfo:{}
        }
    },
    props:{
        info: Object,
    },
    computed:{
        dialogVisible:{
            get(){
                return this.$store.state.courseEditVisible;
            },
            set(val){
                this.$store.commit('setCourseEditVisible',val)
            }
        }
    },
    watch:{
        dialogVisible(val){
            if(val){
                this.courseInfo = this.info;
                console.log(this.courseInfo);
            }
        },
    },
    methods:{
        changeTab(tab){
            this.activeIndex = Number(tab.index);
        },
        update(){
            this.$confirm('是否确定更新？', "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                if(this.activeIndex === 0){
                    this.$emit('editInfo', this.activeIndex, this.courseInfo);
                }else{
                    this.$emit('editInfo', this.activeIndex, this.chapterInfo)
                }
                // this.dialogVisible = false;
            }).catch(() => {
                alert('已取消','info')
            })
            
        },
    }
}
</script>

<style lang="scss" scoped>
    .edit-dialog{
        .update-btn{
            @include right;
            margin-top:12px;
        }
    }
</style>