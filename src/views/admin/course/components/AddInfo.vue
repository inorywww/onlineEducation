<template>
    <div class="course-info">
        <el-form
            label-position="left"
            label-width="80px"
            ref="courseInfo"
            :model="courseInfo"
            :rules="rules"
        >
            <el-form-item label="课程标题" prop="title">
                <el-input v-model="courseInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="总课时" prop="lessonNum">
                <el-input-number
                    v-model="courseInfo.lessonNum"
                    controls-position="right"
                    :min="1"
                ></el-input-number>
            </el-form-item>
            <el-form-item label="课程简介" prop="description">
                <el-input v-model="courseInfo.description"></el-input>
            </el-form-item>
            <el-form-item label="课程价格" prop="price">
                <el-input-number
                    v-model="courseInfo.price"
                    controls-position="right"
                    :min="0"
                ></el-input-number>
                <span>元</span>
            </el-form-item>
             <el-form-item label="课程分类" prop="subject">
                <el-cascader
                    v-model="courseInfo.subject"
                    placeholder="试试搜索：vue"
                    :options="subjects"
                    filterable
                >
                </el-cascader>
            </el-form-item>
            <el-form-item label="课程讲师" prop="teacherId">
                <el-select
                    v-model="courseInfo.teacherId"
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
            <el-form-item label="上传封面" prop="cover">
                <my-upload @uploadData="getUploadData"/>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { listMixin } from "@/utils/mixin";
// import { alert } from "@/utils/index";
import MyUpload from '@/components/MyUpload';
export default {
    name: "courseInfo",
    components:{
        MyUpload
    },
    updated() {
        this.$refs["courseInfo"].validate((valid) => {
            
            this.$emit("infoValid", valid);
            if(this.isUpload){
                this.$emit("uploadData", this.uploadData);
                this.isUpload = false;
            }
        });
    },
    mixins: [listMixin],
    data() {
        return {
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入课程名称！",
                        trigger: "blur",
                    },
                ],
                lessonNum: [
                    {
                        required: true,
                        type: "number",
                        message: "请输入课时！",
                        trigger: "blur",
                    },
                ],
                description: [
                    {
                        required: true,
                        message: "请输入课程简介！",
                        trigger: "blur",
                    },
                ],
                price: [
                    {
                        required: true,
                        type: "number",
                        message: "请输入课程价格！",
                        trigger: "blur",
                    },
                ],
                subject: [
                    {
                        required: true,
                        message: "请选择课程分类！",
                        trigger: "blur",
                    },
                ],
                teacherId: [
                    {
                        required: true,
                        message: "请选择讲师！",
                        trigger: "blur",
                    },
                ],
            },
            uploadData: new FormData(),
            isUpload:false,
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
        teachers() {
            return this.allTeacher.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                }
            })
        },
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
        }
    },
    methods:{
       // 从myupload组件传递回来的文件
        getUploadData(file){
            this.uploadData.append("file", file.raw);
            this.isUpload = true;
            // 当最后才上传封面的时候
            this.$refs["courseInfo"].validate((valid) => {
                this.$emit("infoValid", valid);
                if(this.isUpload){
                    this.$emit("uploadData", this.uploadData);
                    this.isUpload = false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>