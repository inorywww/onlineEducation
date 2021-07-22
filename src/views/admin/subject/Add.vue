<template>
    <div class="container">
        <h1>添加课程分类</h1>
        <el-upload
            drag
            action="#"
            :multiple="false"
            :auto-upload="false"
            :on-change="beforeUpload"
            ref="upload"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
                只能上传xlsx文件
            </div>
        </el-upload>
        <el-button class="upload-btn" type="primary" @click="upload">上传</el-button>
    </div>
</template>

<script>
import { alert } from "@/utils/index";
export default {
    name:'addSubject',
    data(){
        return {
            uploadData: new FormData(),
            isUpload:false,
        }
    },
    methods:{
         beforeUpload(file) {
            const isXlsx = file.name.split('.')[1] === 'xlsx';
            if (!isXlsx) {
                alert("图片只能是xlsx格式!", "error");
                this.$refs.upload.clearFiles();
                return isXlsx;
            }
            this.uploadData.append("file", file.raw);
            this.isUpload = true;
        },
        upload(){
            if(this.isUpload){
                this.$api.subject.addSubject(this.uploadData).then(() => {
                    alert('上传成功！','success')
                    this.$refs.upload.clearFiles();
                    this.$store.dispatch('getSubject');
                    setTimeout(() => {
                        location.reload();
                    },500)
                });
            }
            else{
                alert('未选择任何文件！','warning')
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    text-align: center;
    h1 {
        font-size: $text-big;
        margin: 12px auto;
    }
    .upload-btn{
        margin: 12px auto;
    }
}
</style>