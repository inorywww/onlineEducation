<template>
    <div class="not-found">
        <div>你走丢了，这里什么都没有哦~</div>
        <el-button type="primary" @click="toHome">回到主页</el-button>
    </div>
</template>

<script>
export default {
    name:'notFound',
    methods:{
        toHome(){
            this.$router.replace('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.not-found{
    margin: 20px auto;
    text-align: center;
    font-size: $text-big;
    .el-button{
        margin: 20px auto;
    }
}
</style>