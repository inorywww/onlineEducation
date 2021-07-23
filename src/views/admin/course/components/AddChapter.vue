<template>
    <div class="course-chapter">
        <div class="container">
            <el-button
                type="primary"
                size="medium"
                @click="handleCreate"
                
                icon="el-icon-circle-plus-outline"
                style="margin: 10px 0"
                >添加</el-button
            >
            <el-table
                :data="tableData"
                style="width: 100%; margin-bottom: 20px"
                border
                row-key="value"
                stripe
                size="medium"
                :tree-props="{ children: 'children' }"
            >
                <el-table-column prop="label" label="名称">
                </el-table-column>
                <el-table-column prop="sort" label="序号">
                </el-table-column>
                <el-table-column label="操作" align="center" width="180">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            @click="handleUpdate(scope.row)"
                            ></el-button
                        >
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="deleteClick(scope.row)"
                            ></el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                :title="textMap[dialogStatus]"
                :visible.sync="dialogFormVisible"
                width="50%"
            >
                <el-form
                    ref="dataForm"
                    :rules="rules"
                    :model="temp"
                    label-position="left"
                    label-width="120px"
                    style="margin-left: 50px"
                >
                    <el-form-item
                        label="层级："
                        prop="location"
                        v-if="dialogStatus !== 'update'"
                    >
                        <el-select
                            v-model="temp.location"
                            placeholder="请选择层级"
                            @change="locationChange"
                            size="small"
                        >
                            <el-option
                                v-for="item in locationData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        v-if="sonStatus && dialogStatus !== 'update'"
                        label="章节："
                        prop="parent"
                    >
                        <el-select 
                        v-model="temp.parent"
                        @change="chapterChange"
                        placeholder="请选择">
                            <el-option
                            v-for="item in tableData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="标签名称：" prop="label">
                        <el-input
                            v-model="temp.label"
                            size="small"
                            autocomplete="off"
                            placeholder="请输入名称"
                        ></el-input>
                    </el-form-item>
                    
                     <el-form-item
                        v-if="sonStatus"
                        label="是否免费："
                        prop="isFree"
                    >
                        <el-radio v-model="temp.isFree" :label="true">免费</el-radio>
                        <el-radio v-model="temp.isFree" :label="false">默认</el-radio>
                    </el-form-item>

                    <el-form-item label="序号：" prop="sort">
                        <el-input-number :min="1" v-model="temp.sort" label="描述文字"></el-input-number>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size="small">
                        取消
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        @click=" dialogStatus === 'create' ? createData() : updateData()"
                    >
                        确认
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { alert } from "@/utils/index";
export default {
    name: "courseChapter",
    mounted(){
    },
    data() {
        return {
            textMap: {
                update: "编辑",
                create: "添加",
            },
            dialogStatus: "",
            dialogFormVisible: false,
            temp: {},
            sonStatus: false,
            idx: "",
            parentIndex: 0,
            rules: {
                location: [{required: true,message: "请选择章节",trigger: "blur"}],
                label: [{ required: true, message: "请输入名称", trigger: "blur" },],
                parent: [{required: true,message: "请选择章节",trigger: "blur"},],
                isFree:[{required: true,message: "请选择是否免费",trigger: "blur"}]
            },
            locationData: [
                {
                    id: "1",
                    name: "章节",
                },
                {
                    id: "2",
                    name: "小节",
                },
            ],
        };
    },
    computed:{
        tableData(){
            return this.$store.state.tableData
        },
        sortTemp(){
            return 0
        }
    },
    methods: {
        // 同步子名称
        useChildLable(arr) {
            if (arr.length !== 0) {
                arr.forEach(item => item.parent = this.temp.value);
            }
        },
        // 置空
        resetTemp() {
            this.temp = {
                sort: 1,
            };
        },
        // 打开添加
        handleCreate() {
            this.resetTemp();
            this.dialogFormVisible = true;
            this.dialogStatus = "create";
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        // 添加
        createData() {
            this.$refs["dataForm"].validate((valid) => {
                if (valid) {
                    if (this.sonStatus == false) {
                        if(this.hasSort(this.tableData)){
                            alert('添加失败，sort不能重复！','warning')
                            return false;
                        }
                        this.temp.value = String(this.tableData.length);
                        const obj = Object.assign({}, this.temp);
                        obj.children = [];
                        obj.parent = "";
                        this.tableData.push(obj);
                        this.resetSort();
                        this.$store.commit('setTableData',this.tableData);
                        alert('添加成功','success');
                        this.dialogFormVisible = false;
                    } else {
                        let arr = [];//childrens
                        this.tableData.forEach((item,index) => {
                            if(item.value === this.temp.parent){
                                arr = item.children;
                                this.parentIndex = index;
                            }
                        });
                        if(this.hasSort(arr)){
                            alert('添加失败，sort不能重复！','warning')
                            return false;
                        }
                        delete this.temp.children;
                        const obj = Object.assign({}, this.temp);
                        obj.value = String(this.parentIndex) + '-' + String(arr.length);
                        obj.childKey = [this.parentIndex, arr.length];
                        arr.push(obj);
                        this.resetSort();
                        this.$store.commit('setTableData',this.tableData);
                        alert('添加成功','success');
                        this.dialogFormVisible = false;
                    }
                } else {
                    return false;
                }
            });
        },
        // 打开更新
        handleUpdate(row) {
            console.log(this.tableData);
            row.value.length !== 1 ? (this.sonStatus = true) : (this.sonStatus = false);
            this.temp = Object.assign({}, row); // copy obj
            if (this.sonStatus) {
                this.tableData.forEach((item,index) => {
                    if(item.value === this.temp.parent){
                        this.parentIndex = index;
                    }
                });
                this.idx = this.tableData[this.parentIndex].children.findIndex(item => item.value === row.value)
            } else {
                this.idx = this.tableData.findIndex(item => item.value === row.value);
            }
            // return
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        // 更新
        updateData() {
            this.$refs["dataForm"].validate((valid) => {
                if (valid) {
                    if (this.temp.location === "1") {
                        if(this.hasSort(this.tableData)){
                            alert('编辑失败，sort不能重复！','warning')
                            return false;
                        }
                        this.tableData.splice(this.idx, 1, this.temp);
                        this.useChildLable(this.tableData[this.idx].children);
                        this.resetSort();
                        this.$store.commit('setTableData',this.tableData);
                        alert('编辑成功','success');
                        this.dialogFormVisible = false;
                    } else {
                        if(this.hasSort(this.tableData[this.parentIndex].children)){
                            alert('编辑失败，sort不能重复！','warning')
                            return false;
                        }
                        this.tableData[this.parentIndex].children.splice(this.idx, 1, this.temp);
                        this.resetSort();
                        this.$store.commit('setTableData',this.tableData);
                        alert('编辑成功','success');
                        this.dialogFormVisible = false;
                    }
                } else {
                    return false;
                }
            });
        },
        // 删除
        deleteClick(row) {
            row.value.length !== 1 ? (this.sonStatus = true) : (this.sonStatus = false);
            this.$confirm(`此操作将删除该标签, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                if (row.location === '1' && row.children.length !== 0) {
                    alert('请先删除子节点','warning');
                } else {
                    if(row.location === '1'){
                        const index = this.tableData.findIndex(table => table.value === row.value)
                        this.tableData.splice(index, 1);
                    }
                    else{
                        this.tableData.forEach(table => {
                            if(table.value === row.parent){
                                const index = table.children.findIndex(child => child.value === row.value)
                                table.children.splice(index, 1);
                            }
                        })
                    }
                    this.resetSort();
                    this.$store.commit('setTableData',this.tableData);
                    alert('删除成功','success')
                }
            }).catch(() => {
               alert('已取消删除','info')
            });
        },
        // 是否显示次位置
        locationChange(v) {
            if (v == 2) {
                this.sonStatus = true;
                this.temp.sort = 1
            } else {
                this.sonStatus = false;
                this.temp.sort = this.tableData.length + 1
            }
        },
        //改变父章节时，动态改变sort
        chapterChange(v){
            this.temp.sort = this.tableData[v].children.length + 1;
        },
        // 根据sort重新排序
        resetSort(){
            this.tableData.sort(compare('sort'));
            this.tableData.forEach(item => {
                item.children.sort(compare('sort'));
            })
            function compare(property){
                return function(a,b){
                    const value1 = a[property];
                    const value2 = b[property];
                    return value1 - value2;
                }
            }
        },
        // 判断是否有当前sort
        hasSort(arr){
            if(arr.length === 0){
                return false;
            }
            const tempArr = arr.filter(item => item.value !== this.temp.value)
            return tempArr.findIndex(item => item.sort === this.temp.sort) !== -1;
        }
        // updateAddInfo(){
        //     const chapterInfo = this.tableData.map(item => {
        //         return {
        //             title:item.label
        //         }
        //     });
        //     // console.log(chapterInfo);
        //     const videoInfos = []
        //     this.tableData.forEach(item => {
        //         item.children.forEach(video => {
        //             videoInfos.push({
        //                 title:video.label
        //             })
        //         })
        //     })
        //     // console.log(videoInfos);
        // }
    },
};
</script>

<style lang="scss" scoped>
</style> 