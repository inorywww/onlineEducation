<template>
    <el-upload
        :class="{ hideUpload: isUpload }"
        action=""
        list-type="picture-card"
        :auto-upload="false"
        :on-change="beforeUpload"
        :on-remove="removeFile"
        ref="upload"
        :file-list="defalutCover"
    >
        <i class="el-icon-plus"></i>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
    </el-upload>
</template>

<script> 
export default {
    name:'upload',
    mounted(){
        this.isUpload = this.isCover ? true:false;
    },
    data(){
        return {
            isUpload: false,
        }
    },
    props:{
        defalutCover:Array,
    },
    computed:{
        isCover:{ //判断是否有默认封面
            get(){
                if(!this.defalutCover){
                    return false
                }
                return this.defalutCover.length !==0 ? true:false
            },
            set(val){
                val
            }
        }
    },
    methods:{
        beforeUpload(file) {
            const isJPG = file.raw.type === "image/jpeg" || file.raw.type === "image/png";
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
            this.isUpload = true;
            this.$emit('uploadData',file); //给父组件传值回去
        },
        removeFile() {
            this.isUpload = false;
        },
    }
};
</script>
<style lang="scss" scoped>

</style>