<template>
    <div class="teacher-add">
      <el-form :model="addForm" :rules="formRules" ref="addForm">
                <el-form-item label="姓名" label-width="120px" prop="name">
                    <el-input
                        v-model="addForm.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="介绍" label-width="120px" prop="intro">
                    <el-input
                        v-model="addForm.intro"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="讲师头像"
                    label-width="120px"
                    prop="avatar"
                    class="upload-container"
                >
                    <div class="input-box">
                        <el-input
                            v-model="addForm.avatar"
                            autocomplete="off"
                            disabled
                        ></el-input>
                    </div>

                    <div class="upload-box">
                        <el-upload
                            class="upload-demo"
                            action=""
                            :multiple="true"
                            :on-change="beforeUpload"
                            :auto-upload="false"
                            :on-remove="removeFile"
                            ref="avatar"
                        >
                            <el-button type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                只能上传jpg/png文件
                            </div>
                        </el-upload>
                    </div>
                </el-form-item>

                <el-form-item label="头衔" label-width="120px" prop="career">
                    <el-select
                        v-model="addForm.career"
                        placeholder="请选择头衔"
                        clearable
                    >
                        <el-option
                            v-for="(item, index) in allCareer"
                            :key="index"
                            :label="item"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
    </div>
</template>

<script>
export default {
    name:'addTeacher',
    created(){
        // this.getAllCareer();
    },
    computed:{
        allCareer(){
            return this.$store.state.allCareer;
        }
    },
    data(){
        return {
            addForm:{},
            uploadData: new FormData(),
            isUpload: false,
            file:'',
            formRules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                ],
                intro: [
                    { required: true, message: "请输入简介", trigger: "blur" },
                ],
            },
        }
    },
    methods:{
        beforeUpload(file) {
            const isJPG =
                file.raw.type === "image/jpeg" || file.raw.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;
            
            if (!isJPG) {
                alert("图片只能是jpg/png格式!", "error");
                this.$refs.avatar.clearFiles();
                return isJPG;
            }
            if (!isLt2M) {
                alert("上传头像图片大小不能超过 2MB!", "error");
                this.$refs.avatar.clearFiles();
                return isLt2M;
            }
            if(this.file !== ''){
                alert('只允许上传一张！','warning');
                return false;
            }
            
            this.file = file;
            this.uploadData.append("file", file.raw);
            this.isUpload = true;
        },
        removeFile() {
            this.uploadData = new FormData();
            this.isUpload = false;
        },
        addTeacher() {
        },
        // getAllCareer(){
        //     this.$api.teacher.getAllCareer().then(res => {
        //         this.allCareer = res.data.data.careers.map(item => item.career)
        //     });
        // },
    }
}
</script>

<style>

</style>