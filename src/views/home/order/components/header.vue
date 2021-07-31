<template>
    <div class="header">
        <div class="title">
            <h1>订单确认</h1>
        </div>
        <div class="progress">

        </div>
    </div>
</template>

<script>
export default {
    name:'orderHeader',
}
</script>

<style lang="scss" scoped>
.header{
    .title{
        padding: 24px;
        border-bottom: $border;
        h1{
            font-size: $text-big;
        }
    }   
}
</style>