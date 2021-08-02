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

                <el-form-item label="标题" label-width="120px" prop="name">
                    <el-input
                        v-model="editForm.title"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="图片"
                    label-width="120px"
                    prop="avatar"
                    class="upload-container"
                >
                    <div class="upload-box">
                        <my-upload @uploadData="getUploadData" :defalutCover="[{name:'cover',url:editForm.imageUrl}]"/>
                    </div>
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
                    @confirm="edit"
                >
                    <el-button type="primary" slot="reference">确 定</el-button>
                </el-popconfirm>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { alert, equalObj } from "@/utils/index";
import MyUpload from '@/components/MyUpload';

export default {
    name: "editDialog",
    props: {
        editForm: Object,
        editIsShow: Boolean,
        originForm: Object,
    },
    components:{MyUpload},
    computed: {
        isShow: {
            get() {
                return this.editIsShow;
            },
            set(val) {
                // 给父组件传值，更改显示状态
                this.file = '';
                this.uploadData = new FormData();
                this.$emit("childByValue", val);
            },
        },
    },
    data() {
        return {
            formRules: {
                title: [
                    { required: true, message: "请输入标题", trigger: "blur" },
                ],
            },
            uploadData: new FormData(),
            isUpload: false,
        };
    },
    methods: {
        edit() {
            // 当改变了的时候才发请求
            if (!equalObj(this.editForm, this.originForm) || this.isUpload) {
                this.$refs["editForm"].validate(async (valid) => {
                    if (valid) {
                        if (this.isUpload) {
                            await this.$api.oss.upload(this.uploadData).then(res => {
                                this.editForm.imageUrl = res.data.data.url;
                            });
                        }
                        this.$api.banner.updateBanner(this.editForm)
                            .then((res) => {
                                if (res.status === 200) {
                                    alert("修改成功", "success");
                                    this.uploadData = new FormData();
                                    this.isUpload = false;
                                    this.$emit("childByValue", false);//关闭dialog
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
        // 从myupload组件传递回来的文件
        getUploadData(file){
            console.log(file);
            this.uploadData.append("file", file.raw);
            this.isUpload = true;
        }
    },
};
</script>

<style lang="scss" scoped>
</style>