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
        await this.$store.dispatch('getTeacher');
        await this.$store.dispatch('getCareer');
        await this.$store.dispatch('getSubject');
        // await this.$store.dispatch('getIndexData');
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
.upload-container > .el-form-item__content{
    display: flex !important;
    .input-box{
        flex: 1;
    }
}
.hideUpload .el-upload--picture-card {
    display: none;
}
.el-upload-list__item {
    transition: none !important;
}
</style>
