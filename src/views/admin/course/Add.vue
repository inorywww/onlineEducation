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
                    description="提交审核"
                ></el-step>
            </el-steps>
        </div>
        <keep-alive>
            <div class="conatiner">
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
                <el-button style="margin-top: 12px" type="primary" @click="pre">上一步</el-button>
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
export default {
    components: { AddInfo, AddChapter, AddSubmit },
    name: "courseAdd",
    data() {
        return {
            active: 0,
            infoVaild:false,
            uploadData: new FormData(),
        };
    },
    computed: {
        courseInfo: {
            get() {
                return this.$store.state.addCourseInfo
            },
            set(val) {
                return val
            },
        },
    },
    methods: {
        pre() {
            if (this.active > 0) {
                this.active --;
            }
        },
        async next() {
            if (this.active < 2) {
                if(this.active === 0 ){
                    if(this.infoVaild){
                        alert('填写课程信息成功','success');
                        await this.$api.oss.upload(this.uploadData).then((res) => {
                            this.courseInfo.cover = res.data.data.url;
                            console.log(res);
                        });
                        console.log(this.courseInfo);
                        this.active ++;
                    }
                    else{
                        alert('请正确填写字段！','error')
                    }
                }
            }
        },
        submit(){
            console.log('submit');
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
</style>