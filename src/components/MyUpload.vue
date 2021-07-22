<template>
    <el-upload
        :class="{ hideUpload: isUpload }"
        action=""
        list-type="picture-card"
        :auto-upload="false"
        :on-change="beforeUpload"
        :on-remove="removeFile"
        ref="upload"
    >
        <i class="el-icon-plus"></i>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
    </el-upload>
</template>

<script>
export default {
    name:'upload',
    data(){
        return {
            uploadData: new FormData(),
            isUpload: false,
        }
    },
    methods:{
        beforeUpload(file) {
            const isJPG =
                file.raw.type === "image/jpeg" || file.raw.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                alert("图片只能是jpg/png格式!", "error");
                this.$refs.upload.clearFiles();
                return isJPG;
            }
            if (!isLt2M) {
                alert("上传头像图片大小不能超过 2MB!", "error");
                this.$refs.upload.clearFiles();
                return isLt2M;
            }
            this.uploadData.append("file", file.raw);
            this.isUpload = true;
            this.$emit('uploadData',file); //给父组件传值回去
        },
        removeFile() {
            this.uploadData = new FormData();
            this.isUpload = false;
        },
    }
};
</script>