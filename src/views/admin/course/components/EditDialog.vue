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
            newChapters:[],
            newChapterInfo:[]
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
        },
        courseId(){
            return this.$store.state.courseEditForm.id;
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
            try{
                var {valid, coverIsChange} = this.$refs['editCourseInfo'].validateForm();
                // 如果课程信息改变了，就更新课程信息
                // 判断是否做了更改
            }catch(err){
                valid = true;
            }
            // 判断现在的json字符串是不是和之前相等，如果不相等才进行修改
            const flag1 = this.$store.state.editOriginData.course !== JSON.stringify(this.$store.state.courseEditForm) || coverIsChange
            if(flag1  && this.activeIndex === 0){
                this.updateCourse(valid, coverIsChange);
            }
            const flag2 = this.$store.state.editOriginData.chapter !== JSON.stringify(this.$store.state.chapterEditForm)
            if(flag2  && this.activeIndex === 1){
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
                            await this.$api.course.publishCourse(this.courseId)
                        }
                        else if(this.$store.state.courseEditForm.status === 'Draft'){
                            await this.$api.course.unpublishCourse(this.courseId);
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
                    if(this.newChapters.length!==0){
                        // 如果有新加的章节，就重新获取新章节的id
                        await setTimeout(() => {
                        this.$api.chapter.getChapterVideo(this.$store.state.courseEditForm.id)
                            .then(res => {
                                const originData = JSON.parse(this.$store.state.editOriginData.chapter);
                                res.data.data.allChapterVideo.forEach(item => {
                                    if(!originData.find(j => j.id  === item.id)){
                                        this.newChapterInfo.push(item)
                                    }   
                                })
                                this.setVideoUpdate(this.$store.state.chapterEditForm);
                                this.dialogVisible = false;
                            })
                    }, 500);
                    }
                    else{
                        this.setVideoUpdate(this.$store.state.chapterEditForm);
                        this.dialogVisible = false;
                    }
                })
                .catch(()=>{
                    alert('已取消修改','info')
                })
            }
        },
        //更新章节信息
        async setChapterUpdate(arr){
            // 获取所有的chapter
            const newArr = arr.concat();
            const chapters = newArr.map(item => {
                return {
                    title: item.label,
                    sort: item.sort,
                    id:item.id,
                    courseId:this.info.id,
                }
            });
             // 获取提交表单后的chapter
            const oldChapters = chapters.filter(item => item.id);
            //获取原始的所有chapter
            const originData = JSON.parse(this.$store.state.editOriginData.chapter);
            const originChapters = [];// 存放打开编辑前原来所有video
            const needEdit = [];
            
            originData.forEach(item => {
                // 判断是否已经删除了，如果已经删了就不要加入needEdit
                if(this.$store.state.delChapters.find(j=>j.id !== item.id)){
                    originChapters.push(item);
                }
                if(this.$store.state.delChapters.length === 0){
                    originChapters.push(item);
                }
            })
            // console.log('oldChapters',oldChapters);
            // console.log('originChapters',originChapters);
            // 找出不同的，然后对不同的chapter进行修改
            oldChapters.forEach((item,index) => {
                    if(oldChapters[index].title !== originChapters[index].title || 
                    oldChapters[index].sort !== originChapters[index].sort){
                        needEdit.push(item)
                    }
            })
            console.log('needEdit',needEdit);
            this.updateOld(needEdit);

            //获取新增的chapter并增加
            const newChapters = chapters.filter(item => !item.id);
            newChapters.forEach(item => delete item.id);
            this.newChapters = newChapters;
            this.addNewChapter(newChapters);
            console.log('newChapters',newChapters);
            //删除chapter
            const delChapters = this.$store.state.delChapters;
            console.log('delChapters',delChapters);
            if(delChapters.length!==0){
                delChapters.forEach(async item => {
                    await this.$api.chapter.delChapter(item.id)
                    // .then(res =>console.log(res.data))
                    .catch(() => alert('网络错误！','error'))
                });
            }
            alert('更改章节信息成功！','success');
        },
        // 如果有新加的 就新建
        addNewChapter(chapters){
            if(chapters.length!==0){
                chapters.forEach(chapter => this.$api.chapter.addChapter(chapter)
                .catch(() => {
                    alert('网络错误！','error');
                }));
            }
        },
        // 修改
        updateOld(chapters){
            if(chapters.length!==0){
                chapters.forEach(chapter => this.$api.chapter.updateChapter(chapter).catch(() => {
                    alert('网络错误！','error');
                }));
            }
        },
        // 更新小节信息
        async setVideoUpdate(arr){
            const newArr = arr.concat();
            const videos = []
            console.log('newArr',newArr);
            newArr.forEach(chapter => {
                chapter.children.forEach(item => {
                    videos.push({
                        courseId: this.courseId,
                        chapterId:chapter.id,
                        // duration:item.duration,
                        id:item.id,
                        isFree: item.isFree,
                        // size: item.size,
                        sort: item.sort,
                        title: item.label,
                        videoOriginalName: item.videoOriginalName,
                        videoSourceId: item.videoSourceId,
                        parent:chapter.label,
                    })
                })
            });
              // 获取提交表单后的所有video （不包含新增的和删除的
            const oldVideos = videos.filter(item => item.id);
            // 获取原始的所有chapter
            const originData = JSON.parse(this.$store.state.editOriginData.chapter);
            const originVideos = []; // 存放打开编辑前原来所有video
            //修改video
            originData.forEach(chapter => {
                chapter.children.forEach(item => {
                    // 判断是否已经删除了，如果已经删了就不要加入needEdit
                    if(this.$store.state.delVideos.find(j => j.id !== item.id)){
                        originVideos.push(item);
                    }
                    if(this.$store.state.delVideos.length===0){
                        originVideos.push(item);
                    }
                })
            });
            // 找出不同的，然后对不同的chapter进行修改
            const needEdit = [];
            // console.log('oldVideos',oldVideos);
            // console.log('originVideos',originVideos);
            oldVideos.forEach((i,index) => {
                if(oldVideos[index].title !== originVideos[index].title || 
                oldVideos[index].sort !== originVideos[index].sort || 
                oldVideos[index].isFree !== originVideos[index].isFree
                // oldVideos[index].videoSourceId !== originVideos[index].videoSourceId || 
                ){
                    needEdit.push(i);
                }
            })
            this.updateOldVideo(needEdit);
            console.log('needEdit',needEdit);
            // 添加新的video
            const newVideos = videos.filter(item => !item.id);
            console.log('newVideos',newVideos);
            newVideos.forEach(item => {
                delete item.id;
                delete item.videoOriginalName;
                delete item.videoSourceId;
                if(!item.chapterId){
                    item.chapterId = this.newChapterInfo.find(j => j.title === item.parent).id
                }
                // delete item.duration;
                // delete item.size;
            })
            this.addNewVideo(newVideos)
            //删除chapter
            const delVideos = this.$store.state.delVideos;
            console.log('delVideos',delVideos);
            if(delVideos.length!==0){
                delVideos.forEach(item => {
                    this.$api.video.delVideo(item.id).catch(() => alert('网络错误！','error'))
                });
            }
            alert('更改小节信息成功！','success')
        },
        updateOldVideo(videos){
            if(videos.length!==0){
                videos.forEach(video => this.$api.video.updateVideo(video).catch(() => {
                    alert('网络错误！','error');
                }));
            }
        },
        // 如果有新加的 就新建
        addNewVideo(videos){
            if(videos.length!==0){
                videos.forEach(video => this.$api.video.addVideo(video).catch(() => {
                    alert('网络错误！','error');
                }));
            }
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