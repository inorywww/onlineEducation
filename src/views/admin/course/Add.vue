<template>
    <div class="course-add">
        <div class="steps">
            <el-steps :active="active" align-center >
                <el-step
                    title="步骤1"
                    description="填写课程基本信息"
                ></el-step>
                <el-step
                    title="步骤2"
                    description="创建课程大纲"
                ></el-step>
                <el-step
                    title="步骤3"
                    description="发布课程"
                ></el-step>
            </el-steps>
        </div>
        <keep-alive>
            <div :class="`conatiner ${2===active?'isSubmit':''}`" >
                <add-info v-if="0 === active" @infoValid="getInfoValid" @uploadData="getUploadData"/>
                <add-chapter v-if="1 === active"/>
                <add-submit v-if="2 === active"/>
            </div>
        </keep-alive>
        
        <div class="actions">
            <template v-if="0 === active">
                <el-button style="margin-top: 12px" type="primary" @click="next">保存并下一步</el-button>
            </template>
            <template v-if="1 === active">
                <el-button style="margin-top: 12px" type="primary" @click="pre">上一步</el-button>
                <el-button style="margin-top: 12px" type="primary" @click="next">下一步</el-button>
            </template>
            <template v-if="2 === active">
                <span style="font-size:16px">是否同时发布课程</span>
                <el-switch
                v-model="isSubmit"
                active-color="#13ce66"
                inactive-color="#ff4949"
                >
                </el-switch>
                <el-button style="margin: 12px 0 0 12px" type="primary" @click="pre">上一步</el-button>
                <el-button style="margin-top: 12px" type="success" @click="submit">提交</el-button>
                
            </template>
        </div>
    </div>
</template>

<script>
import { alert } from "@/utils/index";
import AddChapter from './components/AddChapter';
import AddInfo from './components/AddInfo';
import AddSubmit from './components/AddSubmit';
import { listMixin } from "@/utils/mixin";
export default {
    components: { AddInfo, AddChapter, AddSubmit },
    name: "courseAdd",
    data() {
        return {
            infoVaild:false,
            uploadData: new FormData(),
        };
    },
    mixins: [listMixin],
    computed: {
        // 课程信息
        courseInfo: {
            get() {
                return this.$store.state.addCourseInfo
            },
            set(val) {
                return val;
            },
        },
        // 章节信息
        tableData(){
            return this.$store.state.tableData
        },
        // 当前进度
        active:{
            get(){
                return this.$store.state.courseActive;
            },
            set(val){
                this.$store.commit('setActive',val);
            }
        },
        isSubmit:{
            get(){
                return this.$store.state.isSubmit;
            },
            set(val){
                this.$store.commit('setIsSubmit',val);
            }
        }
    },
    methods: {
        pre() {
            if (this.active > 0) {
                this.active --;
            }
        },
        async next() {
            if (this.active < 3) {
                if(this.active === 0 ){
                    if(this.infoVaild){
                        alert('填写课程信息成功','success');
                        await this.$api.oss.upload(this.uploadData).then((res) => {
                            this.courseInfo.cover = res.data.data.url || '';
                        });
                        this.allTeacher.forEach(item => {
                            if (item.id === this.courseInfo.teacherId){
                                this.$store.state.addCourseInfo.teacherName = item.name;
                            }
                        });
                        this.active ++;
                    }
                    else{
                        alert('请正确填写字段！','error')
                    }
                }
                else if(this.active === 1){
                    this.active ++;
                }
            }
        },
        async submit(){
            this.$confirm(this.isSubmit?'是否添加并发布？':'是否仅添加？', "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async ()=>{
                const subjectParent = this.allSubject.find(item => item.value === this.courseInfo.subject[0]);
                const subject = subjectParent.children.find(item => item.value === this.courseInfo.subject[1]);
                const courseInfo = {
                    cover: this.courseInfo.cover,
                    description: this.courseInfo.description,
                    lessonNum: this.courseInfo.lessonNum,
                    price: this.courseInfo.price,
                    subjectId: subject.id,
                    subjectParentId: subjectParent.id,
                    teacherId: this.courseInfo.teacherId,
                    title: this.courseInfo.title,
                }
                let courseId =  '';
                await this.$api.course.addCourse(courseInfo).then(res => {
                    courseId = res.data.data.id
                })
                const chapters = this.tableData.map(item => {
                    return {
                        title: item.label,
                        sort: item.sort,
                        courseId
                    }
                });
                let chapterIds = [];
                chapters.forEach(chapter => this.$api.chapter.addChapter(chapter));
                setTimeout(async () =>{
                        await this.$api.chapter.getChapterVideo(courseId).then(res => {
                        chapterIds = res.data.data.allChapterVideo;
                        this.addVideoInfo(courseId,chapterIds)
                    });
                },500)
            }).catch(() => {
               alert('已取消','info');
            });
        },
        async addVideoInfo(courseId,chapterIds){
            const videos = []
            this.tableData.forEach(table => {
                videos.push(table.children.map(item => {
                    return {
                        courseId,
                        isFree: item.isFree,
                        title: item.label,
                        sort: item.sort,
                        size: item.size,
                        videoOriginalName: item.videoOriginalName,
                        videoSourceId: item.videoSourceId
                    }
                }))
            });
            videos.forEach((item, index) => {
                item.forEach(video => {
                    video.chapterId =  chapterIds[index].id
                });
            })
            videos.forEach(item => {
                item.forEach(video => {
                    this.$api.video.addVideo(video).catch(err => alert(err,'error'))
                })
            });
            // 修改发布信息 draft -> normal
            if(this.$store.state.isSubmit){
                await this.$api.course.publishCourse(courseId).then(res => {
                    if(res.data.code === 20000){
                        alert('发布成功！','success');
                    }
                    else{
                        alert('发布失败，网络错误！','error');
                    }
                });
            }
            else{
                alert('添加成功！','success')
            }
            setTimeout(() => {
                this.$store.commit('initAddInfo');
                this.$router.push("/dashboard/course/list");
            },500)
        },
        getInfoValid(valid){
            this.infoVaild = valid;
        },
        // 从myupload组件传递回来的文件
        getUploadData(data){
            this.uploadData = data;
        }
    },
    updated(){
    }
};
</script>

<style lang="scss" scoped>
.course-add{
    .conatiner{
        width: 70%;
        margin: 12px auto;
    }
    .actions{
        text-align: center;
        margin: 12px auto;
    }
}
.isSubmit{
    width: 90% !important;
}
</style>