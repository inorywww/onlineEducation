<template>
    <div class="banner-all">
        <el-table :data="banners.items" @selection-change="changeSelect" style="width: 100%" border>
             <el-table-column type="expand">
                <template slot-scope="props">
                   <div class="expand-image">
                       <img :src="props.row.imageUrl" alt="image">
                   </div>
                </template>
            </el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="序号" prop="id"></el-table-column>
            <el-table-column label="排序" prop="sort"> </el-table-column>
            <el-table-column label="标题" prop="title"> </el-table-column>
            <el-table-column label="图片" prop="imageUrl"> </el-table-column>
            <el-table-column label="添加时间" prop="gmtCreate"></el-table-column>
            <el-table-column label="修改时间" prop="gmtModified"></el-table-column>
            <el-table-column align="center">
                <template slot="header" slot-scope="scope">
                    <span @change="scope">操作</span>
                </template>
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        @click="edit(scope.row)"
                        class="iconfont"
                        >修改</el-button
                    >
                    <el-button
                        size="medium"
                        type="danger"
                        @click="del(scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="changeSize"
            @current-change="changePage"
            :page-size="pageSize"
            :page-sizes="[5, 10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="banners.total"
            background
        >
        </el-pagination>
        <edit-dialog 
        :originForm="originForm"
        :editForm="editForm" 
        :editIsShow="editIsShow"
        v-on:childByValue="childByValue"
        />
    </div>
</template>

<script>
import { alert } from "@/utils/index";
import EditDialog from "./components/EditDialog"
export default {
    name: "teacherAll",
    components: { EditDialog},
    created() {
        this.pagefilter();
    },
    data() {
        return {
            banners:{
                total:0,
                items:[]
            },
            pageSize: 5,
            currentPageIndex: 1,
            editIsShow:false,
            originForm:{},
            editForm:{},
        };
    },
    methods: {
        edit(row) {
            this.editForm = Object.assign({},row);
            this.originForm = Object.assign({},row);
            this.editIsShow = true;
        },
        del(row) {
            this.$confirm('此操作不可逆，要继续吗？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.banner.delBanner(row.id).then(res => {
                    if(res.data.code === 20000){
                        alert('删除成功','success');
                        this.pagefilter();
                    }else{
                        alert('删除失败，请稍后重试！','error');
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                }); 
            })
        },
        pagefilter(){
            this.$api.banner.pageBanner(this.currentPageIndex, this.pageSize)
                .then(res => {
                    if(res.data.code === 20000){
                        this.banners = res.data.data;
                    }else{
                        alert('网络错误，请稍后重试！','error')
                    }
            });
        },
        changeSelect(val){
            console.log(val);
        },
        changeSize(val) {
            this.pageSize = val;
            this.pagefilter();
        },
        changePage(index) {
            this.currentPageIndex = index;
            this.pagefilter();
        },
        childByValue(childValue){
            this.editIsShow = childValue;
            this.pagefilter();
        },
        
    },
};
</script>

<style lang="scss" scoped>
.banner-all {
    .expand-image{
        text-align: center;
    }
    .el-pagination {
        text-align: center;
        margin: 8px auto;
    }
}
</style>