<template>
    <div class="edit-dialog">
        <el-dialog title="收货地址" :visible.sync="dialogVisible" width="30%">
            <div class="title-tab">
                <el-tabs type="border-card" @tab-click="changeTab">
                    <el-tab-pane label="编辑课程信息">
                        <edit-course-info ref="editCourseInfo" @uploadData="getUploadData"/>
                    </el-tab-pane>
                    <el-tab-pane label="编辑大纲信息">
                        <edit-chapter-info/>
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
import { listMixin } from "@/utils/mixin";

export default {
    components: { EditCourseInfo, EditChapterInfo },
    name:'editDialog',
    data(){
        return {
            shows:['编辑课程信息','编辑大纲信息'],
            activeIndex: 0,
            chapterInfo:{},
            uploadData: new FormData(),
        }
    },
    mixins: [listMixin],
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
                const data = Object.assign({},this.info);
                data.subject = [data.subjectParentName,data.subjectName];
                this.$store.commit('setEditCourseForm',data);
            }
        },
    },
    methods:{
        changeTab(tab){
            this.activeIndex = Number(tab.index);
        },
        update(){
            const {valid, coverIsChange} = this.$refs['editCourseInfo'].validateForm();
            if(valid){
                this.$confirm('是否确定更新？', "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(async () => {
                    if(this.activeIndex === 0){
                        // 只有当封面改变了才重新上传封面
                        if(coverIsChange){
                            await this.$api.oss.upload(this.uploadData).then((res) => {
                                this.$store.state.courseEditForm.cover = res.data.data.url || '';
                            });
                        }
                        // 根据更改后的状态调用对应的接口
                        if(this.$store.state.courseEditForm.status === 'Normal'){
                            await this.$api.course.publishCourse(this.$store.state.courseEditForm.id)
                        }
                        else if(this.$store.state.courseEditForm.status === 'Draft'){
                            await this.$api.course.unpublishCourse(this.$store.state.courseEditForm.id);
                        }
                        const resData = this.setCourseUpdate(this.$store.state.courseEditForm);
                        await this.$api.course.updateCourseInfo(resData).then(res => {
                            if(res.data.code === 20000){
                                alert('更新课程信息成功！','success');
                                //告诉父组件更新成功了，更新当前页面
                                this.$emit('courseUpdate',true);
                            }
                        });
                    }else{
                        alert('更新大纲信息成功！','success')
                    }
                    this.dialogVisible = false;
                }).catch(() => {
                    alert('已取消','info')
                })
            }
            else{
                alert('请正确填写表单！','error')
            }
        },
        // 从myupload组件传递回来的文件
        getUploadData(file){
            this.uploadData.append("file", file.raw);
        },
        setCourseUpdate(data){
            const subjectParent = this.allSubject.find(item => item.value === data.subject[0]);
            const subject = subjectParent.children.find(item => item.value === data.subject[1]);
            return {
                cover: data.cover,
                description: data.description,
                id: data.id,
                lessonNum: data.lessonNum,
                price: data.price,
                subjectId: subject.id,
                subjectParentId: subjectParent.id,
                teacherId: data.teacherId,
                title: data.title,
            };
        }
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