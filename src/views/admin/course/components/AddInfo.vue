<template>
    <div class="course-info">
        <el-form label-position="left" label-width="80px" ref="courseInfo" :model="courseInfo" :rules="rules">
            <el-form-item label="课程标题" prop="title">
                <el-input v-model="courseInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="课程讲师" prop="teacherId">
                <el-select v-model="courseInfo.teacher" clearable placeholder="请选择">
                    <el-option
                    v-for="item in [1,2,3,4]"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="总课时" prop="lessonNum">
                <el-input-number v-model="courseInfo.lessonNum" controls-position="right" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="课程简介" prop="description">
                <el-input v-model="courseInfo.description"></el-input>
            </el-form-item>
            <el-form-item label="课程价格" prop="price">
                <el-input-number v-model="courseInfo.price" controls-position="right" :min="0"></el-input-number>
                <span>元</span>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
export default {
    name:'courseInfo',
    computed:{
        courseInfo:{
            get(){
                return this.$store.state.addCourseInfo;
            },
            set(val){
                console.log(val);
            }
        }
    },
    updated(){
        this.$refs['courseInfo'].validate((valid) => {
            this.$emit('infoValid',valid);
        });
    },
    data(){
        return {
            rules: {
                title: [
                    { required: true, message: '请输入课程名称！', trigger: 'change' },
                ],
                lessonNum: [
                    { required: true, type: 'number', message: '请输入课时！', trigger: 'change' }
                ],
                description: [
                    { required: true, message: '请输入课程简介！', trigger: 'change' }
                ],
                price: [
                    { required: true, type: 'number', message: '请输入课程价格！', trigger: 'change' }
                ],
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>