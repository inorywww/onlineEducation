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
                <el-table-column prop="label" label="标签名称">
                </el-table-column>
                <el-table-column prop="location" label="层级">
                </el-table-column>
                <el-table-column label="操作" :align="alignDir" width="180">
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
                width="30%"
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
                        prop="children"
                    >
                        <el-cascader
                            size="small"
                            :key="isResouceShow"
                            v-model="temp.children"
                            placeholder="请选择章节"
                            :label="'label'"
                            :value="'value'"
                            :options="tableData"
                            :props="{ checkStrictly: true }"
                            clearable
                            @change="getCasVal"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="标签名称：" prop="label">
                        <el-input
                            v-model="temp.label"
                            size="small"
                            autocomplete="off"
                            placeholder="请输入标签名称"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size="small">
                        取消
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        @click=" dialogStatus === 'create'
                                ? createData()
                                : updateData()
                        "
                    >
                        确认
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
// import { alert } from "@/utils/index";
export default {
    name: "courseChapter",
    data() {
        return {
            alignDir: "center",
            textMap: {
                update: "编辑",
                create: "添加",
            },
            dialogStatus: "",
            dialogFormVisible: false,
            temp: {},
            isResouceShow: 1,
            sonStatus: false,
            casArr: [],
            idx: "",
            childKey: [],
            rules: {
                location: [
                    {
                        required: true,
                        message: "请选择章节",
                        trigger: "blur",
                    },
                ],
                label: [
                    { required: true, message: "请输入名称", trigger: "blur" },
                ],
                children: [
                    {
                        required: true,
                        message: "请选择章节",
                        trigger: "blur",
                    },
                ],
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
            // tableData: [
            //     {
            //         tagId: "1", // 标签id
            //         label: "第0", // 标签名称
            //         parent: "", // 父级名称
            //         location: "1", // 层级
            //         value: "0", // 标识位
            //         children: [
            //             {
            //                 tagId: "1", // 子标签id
            //                 childKey: ["0", "0"], // 子标识位
            //                 label: "第0-0",
            //                 parent: "第0",
            //                 location: "2",
            //                 value: "0-0",
            //                 children: [],
            //             },
            //             {
            //                 tagId: "2", // 子标签id
            //                 childKey: ["0", "1"],
            //                 label: "第0-1",
            //                 parent: "第0",
            //                 location: "2",
            //                 value: "0-1",
            //                 children: [],
            //             },
            //         ],
            //     },
            // ],
        };
    },
    computed:{
        tableData(){
            return this.$store.state.tableData
        }
    },
    methods: {
        // 递归寻找同级
        findSameTable(arr, i, casArr) {
            if (i == casArr.length - 1) {
                return arr;
            } else {
                return this.findTable(
                    arr[casArr[i].substr(casArr[i].length - 1, 1)].children,
                    (i += 1),
                    casArr
                );
            }
        },
        // 寻找父级
        findTable(arr, i, casArr) {
            if (i == casArr.length - 1) {
                let index = casArr[i].substr(casArr[i].length - 1, 1);
                return arr[index];
            } else {
                return this.findTable(
                    arr[casArr[i].substr(casArr[i].length - 1, 1)].children,
                    (i += 1),
                    casArr
                );
            }
        },
        // 递归表格数据(添加)
        find(arr, i) {
            if (i == this.casArr.length - 1) {
                return arr[this.casArr[i].substr(this.casArr[i].length - 1, 1)]
                    .children;
            } else {
                return this.find(
                    arr[this.casArr[i].substr(this.casArr[i].length - 1, 1)]
                        .children,
                    (i += 1)
                );
            }
        },
        // 递归表格数据(编辑)
        findSd(arr, i, casArr) {
            if (i == casArr.length - 1) {
                let index = casArr[i].substr(casArr[i].length - 1, 1);
                return arr.splice(index, 1, this.temp);
            } else {
                return this.findSd(
                    arr[casArr[i].substr(casArr[i].length - 1, 1)].children,
                    (i += 1),
                    casArr
                );
            }
        },
        // 递归寻找同步名称
        findLable(arr, i, casArr) {
            if (i == casArr.length - 1) {
                let index = casArr[i].substr(casArr[i].length - 1, 1);
                return arr[index];
            } else {
                return this.findLable(
                    arr[casArr[i].substr(casArr[i].length - 1, 1)].children,
                    (i += 1),
                    casArr
                );
            }
        },
        // 同步子名称
        useChildLable(arr) {
            if (arr !== []) {
                arr.forEach((item) => {
                    item.parent = this.temp.label;
                });
            }
        },
        // 递归表格数据(删除)
        findDel(arr, i, item) {
            let casArr = item.childKey;
            if (i == casArr.length - 2) {
                let index = casArr[i].substr(casArr[i].length - 1, 1);
                arr[index].children.forEach((it, ix, arrs) => {
                    if (it == item) {
                        return arrs.splice(ix, 1);
                    }
                });
            } else {
                return this.findDel(
                    arr[casArr[i].substr(casArr[i].length - 1, 1)].children,
                    (i += 1),
                    item
                );
            }
        },
        // 置空
        resetTemp() {
            this.temp = {};
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
                        this.temp.value = String(this.tableData.length);
                        const obj = Object.assign({}, this.temp);
                        obj.children = [];
                        obj.parent = "";
                        this.tableData.push(obj);
                        this.$store.commit('setTableData',this.tableData);
                        this.$message({
                            type: "success",
                            message: "添加成功",
                        });
                        this.dialogFormVisible = false;
                    } else {
                        let arr = this.find(this.tableData, 0);
                        this.temp.value =
                            String(this.casArr[this.casArr.length - 1]) +
                            "-" +
                            String(arr.length);
                        delete this.temp.children;
                        const obj = Object.assign({}, this.temp);
                        obj.children = [];
                        obj.childKey = [...this.casArr, String(arr.length)];
                        obj.parent = this.findTable(this.tableData,0,this.casArr).label;
                        if (this.temp.location === "2") {
                            obj.location = String([...this.casArr, String(arr.length)].length);
                        }
                        arr.push(obj);
                        this.$store.commit('setTableData',this.tableData);
                        this.$message({
                            type: "success",
                            message: "添加成功",
                        });
                        this.dialogFormVisible = false;
                    }
                } else {
                    return false;
                }
            });
            // console.log(this.tableData);
            // this.updateAddInfo()
        },
        // 打开更新
        handleUpdate(row) {
            row.value.length != 1
                ? (this.sonStatus = true)
                : (this.sonStatus = false);
            this.temp = Object.assign({}, row); // copy obj
            if (row.childKey) {
                this.childKey = row.childKey;
                this.idx = row.childKey[row.childKey.length - 1];
            } else {
                this.idx = row.value;
            }

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
                        this.tableData.splice(this.idx, 1, this.temp);
                        this.useChildLable(this.tableData[this.idx].children);
                        this.$store.commit('setTableData',this.tableData);
                        this.$message({
                            type: "success",
                            message: "编辑成功",
                        });
                        this.dialogFormVisible = false;
                    } else {
                        this.findSd(this.tableData, 0, this.childKey);
                        this.useChildLable(this.findLable(this.tableData, 0, this.childKey).children);
                        this.$store.commit('setTableData',this.tableData);
                        this.$message({
                            type: "success",
                            message: "编辑成功",
                        });
                        this.dialogFormVisible = false;
                    }
                } else {
                    return false;
                }
            });
        },
        // 删除父级节点
        deleteParent(item) {
            this.tableData.forEach((it, ix, arrs) => {
                if (it == item) {
                    return arrs.splice(ix, 1);
                }
            });
        },
        // 删除
        deleteClick(item) {
            this.$confirm(`此操作将删除该标签, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                if (item.children.length != 0) {
                    this.$message.warning({
                        message: "请删除子节点",
                        duration: 1000,
                    });
                } else {
                    ++this.isResouceShow;
                    if (item.value.length == 1) {
                        this.deleteParent(item);
                        this.$store.commit('setTableData',this.tableData);
                        this.$message({
                            type: "success",
                            message: "删除成功",
                        });
                    } else {
                        this.findDel(this.tableData, 0, item);
                        this.$store.commit('setTableData',this.tableData);
                        this.$message({
                            type: "success",
                            message: "删除成功",
                        });
                    }
                }
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        // 是否显示次位置
        locationChange(v) {
            if (v == 2) {
                this.sonStatus = true;
            } else {
                this.sonStatus = false;
            }
        },
        // 获取次位置
        getCasVal(v) {
            this.casArr = v;
        },
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