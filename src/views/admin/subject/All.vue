<template>
    <div class="container">
        <h1>课程分类列表</h1>
        <div class="filter-input">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
            </el-input>
        </div>
        <div class="tree">
            <el-tree
                class="filter-tree"
                :data="list"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree"
            >
            </el-tree>
        </div>
    </div>
</template>

<script>
import { listMixin } from "@/utils/mixin";
export default {
    name: "subjectAll",
    async created() {
        // await this.$api.subject.getAllSubject().then(res => {
        //     this.list = JSON.parse(JSON.stringify(res.data.data.list).replace(/title/g,'label'))
        // });
    },
    mixins: [listMixin],
    data() {
        return {
            filterText: "",
            // list: [],
            defaultProps: {
                children: "children",
                label: "label",
            },
        };
    },
    computed:{
        list(){
            return this.allSubject
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        },
    },
};
</script>

<style lang="scss" scoped>
.container{
    // @include columnCenter;
    text-align: center;
    h1{
        font-size: $text-big;
        margin: 12px 0;
    }
    .tree{
        margin: 0 auto;
        text-align: center;
    }
}
</style>