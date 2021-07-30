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
    },
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
.el-table__row{
    .cell{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}

.tabs-bread{
    .el-breadcrumb__item:not(:last-child){
        .el-breadcrumb__inner{
            cursor: pointer !important;
            &:hover{
                color: $c-green !important;
            }
        }
    }
}
.home-container .el-button:hover, 
.home-container .el-button:focus {
    color: inherit !important;
    border-color: transparent !important;
    background-color: transparent !important;
}
.search{
    .keyword{
        color:$c-red !important;
    }
}

</style>
