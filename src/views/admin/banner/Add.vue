<template>
    <div class="teacher-add">
        <el-form :model="addForm" :rules="formRules" ref="addForm">
            <el-form-item label="标题" label-width="120px" prop="title">
                <el-input v-model="addForm.title" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item
                label="图片"
                label-width="120px"
                prop="avatar"
                class="upload-container"
            >
                <div class="upload-box">
                   <my-upload @uploadData="getUploadData"/>
                </div>
            </el-form-item>
        </el-form>
        <el-button type="primary" class="add-btn" @click="add"
            >添加</el-button
        >
    </div>
</template>

<script>
import { alert } from "@/utils/index";
import MyUpload from '@/components/MyUpload';
export default {
    name: "addTeacher",
    components:{
        MyUpload
    },
    created(){
        

    },
    data() {
        return {
            addForm: {
                
            },
            uploadData: new FormData(),
            formRules: {
                title: [
                    { required: true, message: "请输入标题", trigger: "blur" },
                ],
            },
            isUpload:false,
            allBanner:[],
        }
    },
    methods: {
        add() {
            this.$refs["addForm"].validate(valid => {
                if (valid) {
                    if(!this.isUpload){
                        alert("添加失败，上传图片！","error");
                        return;
                    }
                    this.$confirm("确定要添加吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "success",
                    }).then(async () => {
                        if(this.isUpload){
                            await this.$api.oss.upload(this.uploadData).then(res => {
                                this.addForm.imageUrl = res.data.data.url;
                            });
                        }
                        await this.$api.banner.pageBanner(1, 10).then(res =>{
                            const allBanner = res.data.data;
                            this.addForm['sort'] = allBanner.total + 1;
                        });
                        await this.$api.banner.addBanner(this.addForm).then(res => { 
                            if (res.data.code === 20000) {
                                alert("添加成功", "success");
                                this.addForm = {};
                                this.uploadData = new FormData();
                                this.isUpload = false;
                                this.$router.push('/dashboard/banner/list')
                            } else {
                                alert("添加失败，请稍后重试！","error");
                            }
                        });
                    })
                    // .catch(() => {
                    //     this.$message({
                    //         type: "info",
                    //         message: "已取消添加",
                    //     });
                    // });
                }else{
                    alert('请正确填写字段！','error')
                }
            });
        },
        // 从myupload组件传递回来的文件
        getUploadData(file){
            this.uploadData.append("file", file.raw);
            this.isUpload = true;
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