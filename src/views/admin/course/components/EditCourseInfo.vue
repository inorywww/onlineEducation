<template>
    <div class="edit-course">
        <el-form
            :model="editInfo"
            ref="editCourseInfo"
            label-width="100px"
            :rules="rules"
        >
                <el-form-item label="课程名称" prop="title">
                    <el-input v-model="editInfo.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="editInfo.description" type="textarea" :rows="2"></el-input>
                </el-form-item>
            <div class="form-row">
                <el-form-item label="总课时" prop="lessonNum">
                    <el-input-number
                        v-model="editInfo.lessonNum"
                        controls-position="right"
                        :min="1" 
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="课程价格" prop="price">
                    <el-input-number
                        v-model="editInfo.price"
                        controls-position="right"
                        :min="0"
                    ></el-input-number>
                    <span>元</span>
                </el-form-item>
            </div>
            <div class="form-row">
                <el-form-item label="课程讲师" prop="teacherId">
                    <el-select
                        v-model="editInfo.teacherId"
                        clearable
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in teachers"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="当前状态" prop="status">
                    <el-select
                        v-model="editInfo.status"
                        placeholder="请选择发布状态"
                        clearable
                    >
                        <el-option label="已发布" value="Normal"></el-option>
                        <el-option label="未发布" value="Draft"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item label="课程分类" prop="subject">
                <el-cascader 
                    v-model="editInfo.subject"
                    placeholder="试试搜索：vue"
                    :options="subjects"
                    filterable
                    clearable
                    :props="{ expandTrigger: 'hover' }"
                >
                </el-cascader>
            </el-form-item>
            <el-form-item label="上传封面" prop="cover">
                <my-upload @uploadData="getUploadData" :defalutCover="[{name:'cover',url:showCoverSrc}]"/>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { listMixin } from "@/utils/mixin";
import MyUpload from '@/components/MyUpload';

export default {
    name: "editCourse",
    mixins: [listMixin],
    data(){
        return {
            isUpload:false,
            rules: {
                title: [{ required: true, message: "请输入课程名称！",trigger: "blur",}],
                lessonNum: [{required: true,type: "number",message: "请输入课时！",trigger: "blur",}],
                description: [{required: true,message: "请输入课程简介！",trigger: "blur"}],
                price: [{required: true,type: "number",message: "请输入课程价格！",trigger: "blur",}],
                subject: [{required: true,type:'array',message: "请选择课程分类！",trigger: "blur",}],
                teacherId: [{required: true,message: "请选择讲师！",trigger: "blur",}],
                status: [{required: true,message: "请选择当前状态！",trigger: "blur",}],
            },
            showCoverSrc:''
        }
    },
    created(){
        this.showCoverSrc = this.editInfo.cover;
    },
    computed:{
        subjects(){
            const items = this.allSubject.concat();
            items.forEach(item => {
                item['value'] = item.label;
                if(item.children.length !== 0){
                    item.children.forEach(j => {
                        j['value'] = j.label;
                    });
                }
            })
            return items;
        },
        teachers() {
            return this.allTeacher.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                }
            })
        },
        editInfo(){
            return this.$store.state.courseEditForm;
        },
        dialogVisible:{
            get(){
                return this.$store.state.courseEditVisible;
            },
            set(val){
                this.$store.commit('setCourseEditVisible',val)
            }
        }
    },
    watch:{
        dialogVisible(val){
            if(val){
                this.showCoverSrc = this.editInfo.cover;
            }
        },
    },
    components:{
        MyUpload
    },
    methods:{
        // 从myupload组件传递回来的文件
        getUploadData(file){
            this.showCoverSrc = file.url;
            this.isUpload = true;
            this.$emit('uploadData',file);
        },
        // 验证表单
        validateForm(){
            let valid = false;
            this.$refs["editCourseInfo"].validate((v) => {
               valid = v;
            });
            const coverIsChange =  this.showCoverSrc !== this.editInfo.cover;
            return {valid, coverIsChange}
        }
    }
};
</script>

<style lang="scss" scoped>
.edit-course{
    .form-row{
        display: flex !important;
        justify-content: space-between;
    }
}
</style>