<template>
    <div class="subject-all">
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
export default {
    name: "subjectAll",
    async created() {
        await this.$api.subject.getAllSubject().then(res => {
            this.list = JSON.parse(JSON.stringify(res.data.data.list).replace(/title/g,'label'))
        });
    },
    data() {
        return {
            filterText: "",
            list: [],
            defaultProps: {
                children: "children",
                label: "label",
            },
        };
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
.subject-all{
    width: 50%;
    margin:12px auto;
    .filter-input{
        // width: 50%;
        margin-bottom: 12px;
    }
}
</style>