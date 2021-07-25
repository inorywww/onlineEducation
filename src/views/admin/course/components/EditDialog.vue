<template>
    <div class="edit-dialog">
        <el-dialog title="编辑信息" :visible.sync="dialogVisible" width="30%">
            <div class="title-tab">
                <el-tabs type="border-card" @tab-click="changeTab">
                    <el-tab-pane label="编辑课程信息">
                        <edit-course-info ref="editCourseInfo" @uploadData="getUploadData"/>
                    </el-tab-pane>
                    <el-tab-pane label="编辑大纲信息" :key="sonKey">
                        <edit-chapter-info ref="dataForm"/>
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
            sonKey:'',
            originCourse:'',
            originChapter:'',
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
                this.$store.state.editOriginData.course = JSON.stringify(data); //存储原始数据，后面判断是否做了更改
                this.sonKey = Date.now(); // 刷新数据
            }else{//每次关闭dialog时，清空chapterInfo，清空删除信息
                this.$store.commit('setChapterCourseForm',[])
                this.$store.commit('initDelArr');
            }
        },
    },
    methods:{
        changeTab(tab){
            this.activeIndex = Number(tab.index);
        },
        update(){
            console.log(this.$store.state.chapterEditForm);
            try{
                var {valid, coverIsChange} = this.$refs['editCourseInfo'].validateForm();
                // 如果课程信息改变了，就更新课程信息
                // 判断是否做了更改
            }catch(err){
                valid = true;
            }
            const flag1 = this.$store.state.editOriginData.course !== JSON.stringify(this.$store.state.courseEditForm) || coverIsChange
            if(flag1  && this.activeIndex === 0){
                console.log('updateCourse');
                this.updateCourse(valid, coverIsChange);
            }
            const flag2 = this.$store.state.editOriginData.chapter !== JSON.stringify(this.$store.state.chapterEditForm)
            if(flag2  && this.activeIndex === 1){
                console.log('updateChapter');
                this.updateChapter();
            }
            if(!flag1 && !flag2){
                alert('未作任何修改！','info');
                this.dialogVisible = false;
            }
            
        },
        // 更新课程信息
        updateCourse(valid,coverIsChange){
            if(valid){
                this.$confirm('是否确定更新？', "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(async () => {
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
                    this.dialogVisible = false;
                }).catch(() => {
                    alert('已取消修改','info')
                })
            }
            else{
                alert('请正确填写表单！','error')
            }
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
        },
        // 更新大纲信息
        updateChapter(){
            let valid = true;
            try{
                valid = this.$refs['dataForm'].validateForm();
            }catch(err){
                valid = true;
            }
            if(valid){
                this.$confirm('是否确定更新？', "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(async () => {
                   await this.setChapterUpdate(this.$store.state.chapterEditForm);
                   await this.setVideoUpdate(this.$store.state.chapterEditForm);
                   this.dialogVisible = false;
                }).catch(()=>{
                    alert('已取消修改','info')
                })
            }
        },
        //更新章节信息
        async setChapterUpdate(arr){
            // 获取所有的chapter
            const chapters = arr.map(item => {
                return {
                    title: item.label,
                    sort: item.sort,
                    id:item.id,
                    courseId:this.info.id,
                }
            });
             // 获取修改的chapter
            const oldChapters = chapters.filter(item => item.id);
            this.updateOld(oldChapters);
            //获取新增的chapter
            const newChapters = chapters.filter(item => !item.id);
            newChapters.forEach(item => delete item.id);
            if(newChapters.length !== 0){
                this.addNewChapter(newChapters);
            }
            
            //删除chapter
            const delChapters = this.$store.state.delChapters;
            if(delChapters.length!==0){
                delChapters.forEach(item => {
                    this.$api.chapter.delChapter(item.id).catch(() => alert('网络错误！','error'))
                });
                //清空已删除的列表
                this.$store.commit('initDelArr')
            }
            alert('更改章节信息成功！','success')
        },
        // 如果有新加的 就新建
        addNewChapter(chapters){
            chapters.forEach(chapter => this.$api.chapter.addChapter(chapter).catch(() => {
                alert('网络错误！','error');
            }));
        },
        // 修改
        updateOld(chapters){
            chapters.forEach(chapter => this.$api.chapter.updateChapter(chapter).catch(() => {
                alert('网络错误！','error');
            }));
        },
        // 更新小节信息
        async setVideoUpdate(arr){
            const originChapter = JSON.parse(this.$store.state.editOriginData.chapter);
            console.log('old',originChapter);
            console.log('now',arr);
        },
        // 从myupload组件传递回来的文件
        getUploadData(file){
            this.uploadData.append("file", file.raw);
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