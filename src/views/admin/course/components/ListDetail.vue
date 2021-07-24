<template>
    <div class="detail">
        <el-form
            label-position="left"
            inline
            class="demo-table-expand"
        >
            <el-form-item label="课程ID">
                <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="封面链接">
                <span>{{ props.row.cover }}</span>
                <el-button type="primary" style="margin-left:12px" @click="previewCover(props.row.cover)">预览</el-button>
            </el-form-item>
            <el-form-item label="课程名称">
                <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="所属讲师">
                <span>{{ props.row.teacherName }}</span>
            </el-form-item>
            <el-form-item label="状态">
                <span>{{ props.row.statusName }}</span>
            </el-form-item>
            <el-form-item label="课时数">
                <span>{{ props.row.lessonNum }}</span>
            </el-form-item>
            <el-form-item label="价格">
                <span>￥{{ props.row.price.toFixed(2) }}</span>
            </el-form-item>
            <el-form-item label="观看数量">
                <span>{{ props.row.viewCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
                <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="购买数量">
                <span>{{ props.row.buyCount }}</span>
            </el-form-item>
            <el-form-item label="一级分类">
                <span>{{ props.row.subjectParentName }}</span>
            </el-form-item>
             <el-form-item label="一级分类id">
                <span>{{ props.row.subjectParentId }}</span>
            </el-form-item>
            <el-form-item label="二级分类">
                <span>{{ props.row.subjectName }}</span>
            </el-form-item>
            <el-form-item label="二级分类id">
                <span>{{ props.row.subjectId }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
                <span>{{ props.row.gmtCreate }}</span>
            </el-form-item>
            <el-form-item label="最后修改时间">
                <span>{{ props.row.gmtModified }}</span>
            </el-form-item>
        </el-form>
        <el-dialog title="封面预览" class="coverDialog" :visible.sync="isShow" width="40%">
            <img :src="showCover" alt="image">
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'detail',
    props:{
        props:Object
    },
    data(){
        return {
            showCover:'',
            isShow:false
        }
    },
    methods:{
        previewCover(src){
            this.showCover = src;
            this.isShow = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    
}
.demo-table-expand .el-form-item:nth-child(odd){
    width: 40%;
}
.demo-table-expand .el-form-item:nth-child(even){
    width: 60%;
}
.coverDialog{
    
}
</style>