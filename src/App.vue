<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    async mounted(){
        await this.$store.dispatch('getTeachers');
    }
};
</script>

<style lang="scss">
.el-form--label-top .el-form-item__label{
    padding: 0 !important;
}
.el-tabs__nav-wrap{
    padding: 0 16px !important;
}
</style>
