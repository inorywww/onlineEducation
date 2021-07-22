<template>
    <div class="teacher-add">
        <el-form :model="addForm" :rules="formRules" ref="addForm">
            <el-form-item label="姓名" label-width="120px" prop="name">
                <el-input v-model="addForm.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="介绍" label-width="120px" prop="intro">
                <el-input v-model="addForm.intro" autocomplete="off" type="textarea" :rows="2"></el-input>
            </el-form-item>

            <el-form-item
                label="讲师头像"
                label-width="120px"
                prop="avatar"
                class="upload-container"
            >
                <div class="upload-box">
                    <el-upload
                        class="upload-demo"
                        action=""
                        :multiple="true"
                        :on-change="beforeUpload"
                        :auto-upload="false"
                        :on-remove="removeFile"
                        ref="avatar"
                        drag
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            将文件拖到此处，或<em>点击上传</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">
                            只能上传jpg/png文件，且不超过2MD
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
        <el-button type="primary" class="add-btn" @click="addTeacher"
            >添加</el-button
        >
    </div>
</template>

<script>
import { alert } from "@/utils/index";
export default {
    name: "addTeacher",
    created() {
    },
    computed: {
        allCareer() {
            return this.$store.state.allCareer;
        },
    },
    data() {
        return {
            addForm: {
                level: 0,
                avatar: 'defaultAvatar'
            },
            uploadData: new FormData(),
            isUpload: false,
            file: "",
            formRules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                ],
                intro: [
                    { required: true, message: "请输入简介", trigger: "blur" },
                ],
            },
        };
    },
    methods: {
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
            if (this.file !== "") {
                alert("只允许上传一张！", "warning");
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
            this.$refs["addForm"].validate(async (valid) => {
                if (valid) {
                    if(!this.addForm.career){
                        alert("添加失败，请选择头衔！","error");
                        return;
                    }
                    
                    this.$confirm("确定要添加吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "success",
                    }).then(async () => {
                        if(this.isUpload){
                        await this.$api.oss.upload(this.uploadData).then((res) => {
                            this.addForm.avatar = res.data.data.url;
                        });
                        }
                        this.$api.teacher.addTeacher(this.addForm).then((res) => { 
                            if (res.data.code === 20000) {
                                alert("添加成功", "success");
                                this.addForm = {};
                            } else {
                                alert("添加失败，请稍后重试！","error");
                            }
                        });
                    }).catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消添加",
                        });
                    });
                }else{
                    alert('请正确填写字段！','error')
                }
            });
        }
    },
};
</script>

<style lang="scss" scoped>
.teacher-add {
    margin: 0 auto;
    width: 70%;
    .add-btn {
        margin-left: 200px;
    }
}
</style>