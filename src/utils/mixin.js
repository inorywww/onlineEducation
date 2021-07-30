import {mapGetters} from 'vuex';
import { alert } from "@/utils/index";
export const listMixin = {
    computed: {
      ...mapGetters(['allTeacher', 'allSubject'])
    }
}
export const chapterMixin = {
    data() {
        return {
            textMap: {
                update: "编辑",
                create: "添加",
            }, 
            temp: {},
            idx: "",
            parentIndex: 0,
            parentName:'',
            sonStatus: false,
            dialogStatus: "",
            dialogFormVisible: false,
            rules: {
                label: [{ required: true, message: "请输入名称", trigger: "blur" },],
                isFree:[{required: true,message: "请选择是否免费",trigger: "blur"}],
                sort:[{required: true,type:'number',message: "请选择是否免费",trigger: "blur"}]
            },
        };
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
        handleCreate(val,row = null) {
            this.resetTemp();
            this.dialogFormVisible = true;
            this.dialogStatus = "create";
            this.locationChange(val,row);
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
                        this.temp.value = String(this.tableData.length);//设置唯一值
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
                        this.$store.commit('setShowVideoPath','');
                    }
                } else {
                    return false;
                }
            });
        },
        // 打开更新
        handleUpdate(row) {
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
            // console.log(row);
            if(row.location === '2'){
                this.parentName = this.tableData.find(item  => item.value === row.parent).label
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
                    if(row.location === '1'){//一级节点 章节
                        const index = this.tableData.findIndex(table => table.value === row.value);
                        // this.$store.state.delChapters.push(this.tableData[index]); //加入已删除的章节数组
                        if(this.$route.name === 'course-list'){
                            this.$store.commit('addDelChapter',this.tableData[index])
                        }
                        this.tableData.splice(index, 1);
                    }
                    else{//二级节点 小节
                        this.tableData.forEach(async table => {
                            if(table.value === row.parent){
                                const index = table.children.findIndex(child => child.value === row.value);//小节的index
                                await this.$api.vod.delVideo(table.children[index].videoSourceId);
                                if(this.$route.name === 'course-list'){
                                    const data = table.children[index];
                                    data['chapterId'] = table.id; // 获取章节的id
                                    // this.$store.state.delVideos.push(this.tableData[index]); //加入已删除的章节数组
                                    this.$store.commit('addDelVideo',data)
                                }
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
        // 显示添加章节还是显示添加小节
        locationChange(val,row) {
            if (val === 'chapter') {
                this.sonStatus = false;
                this.temp.sort = this.tableData.length + 1
                this.textMap.create = "添加章节";
                this.temp.location = '1';
            } else {
                this.sonStatus = true;
                this.temp.sort = row.children.length + 1; //改变序号
                this.textMap.create = "添加小节";
                this.temp.parent = row.value;
                this.temp.location = '2';
                this.parentName = row.label;
            }
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
        },
        getVideoData(val){
            this.temp.size = val.size;
            this.temp.videoOriginalName = val.videoOriginalName;
            this.temp.videoSourceId = val.videoSourceId;
        }
    },
}
export const indexMixin = {
    computed:{
        ...mapGetters(['indexData'])
    }
} 
export const searchMixin = {
    computed:{
        searchContent:{
            get(){
                 return this.$store.state.searchContent;
            },
            set(val){
                this.$store.commit('setSearchContent',val)
            }
        }
    },
    methods:{
        search(){
            if(this.searchContent !== '' && this.searchContent !== this.$route.params.title){
                if(this.$route.name === 'search' || this.$route.name === 'searchDetail'){
                    this.$router.replace(`/search/${this.searchContent}`);
                }else{
                    this.$router.push(`/search/${this.searchContent}`);
                }
            }
        },
    }
}