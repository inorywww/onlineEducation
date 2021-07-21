<template>
    <div class="editDialog">
        <el-dialog title="编辑信息" :visible.sync="isShow">
            <el-form :model="editForm" :rules="formRules" ref="editForm">
                <el-form-item label="序号" label-width="120px" prop="id">
                    <el-input
                        v-model="editForm.id"
                        autocomplete="off"
                        :disabled="true"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="创建时间"
                    label-width="120px"
                    prop="gmtCreate"
                >
                    <el-input
                        v-model="editForm.gmtCreate"
                        autocomplete="off"
                        :disabled="true"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="最近修改时间"
                    label-width="120px"
                    prop="mgtModified"
                >
                    <el-input
                        v-model="editForm.gmtModified"
                        autocomplete="off"
                        :disabled="true"
                    ></el-input>
                </el-form-item>

                <el-form-item label="姓名" label-width="120px" prop="name">
                    <el-input
                        v-model="editForm.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="介绍" label-width="120px" prop="intro">
                    <el-input
                        v-model="editForm.intro"
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
                            v-model="editForm.avatar"
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
                        v-model="editForm.career"
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
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-popconfirm
                    confirm-button-text="好的"
                    cancel-button-text="不用了"
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定修改吗？"
                    @confirm="editTeacher"
                >
                    <el-button type="primary" slot="reference">确 定</el-button>
                </el-popconfirm>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { alert, equalObj } from "@/utils/index";
export default {
    name: "editDialog",
    props: {
        editForm: Object,
        editIsShow: Boolean,
        originForm: Object,
    },
    mounted() {},
    computed: {
        isShow: {
            get() {
                return this.editIsShow;
            },
            set(val) {
                // 给父组件传值，更改显示状态
                this.file = '';
                this.$refs.avatar.clearFiles();
                this.uploadData = new FormData();
                this.$emit("childByValue", val);
            },
        },
        allCareer(){
            return this.$store.state.allCareer;
        }
    },
    updated(){
    },
    data() {
        return {
            formRules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                ],
                intro: [
                    { required: true, message: "请输入简介", trigger: "blur" },
                ],
            },
            uploadData: new FormData(),
            isUpload: false,
            file:''
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
        editTeacher() {
            // 当改变了的时候才发请求
            if (!equalObj(this.editForm, this.originForm)) {
                this.$refs["editForm"].validate(async (valid) => {
                    if (valid) {
                        if (this.isUpload) {
                            await this.$api.oss.upload(this.uploadData)
                                .then((res) => {
                                    this.editForm.avatar = res.data.data.url;
                                });
                        }
                        this.$api.teacher.updateTeacher(this.editForm)
                            .then((res) => {
                                if (res.status === 200) {
                                    alert("修改成功", "success");
                                    this.$emit("childByValue", false);//关闭dialog
                                    this.$emit("childRow"); //给父组件传递已经修改的消息，刷新
                                } else {
                                    alert("修改失败，请稍后重试", "error");
                                }
                            })
                            .catch((err) => alert(err, "error"));
                    } else {
                        alert("发布失败！请正确填写字段！", "error");
                        return false;
                    }
                });
            }
            else{
                alert('未做任何修改','info');
                this.$emit("childByValue", false);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>