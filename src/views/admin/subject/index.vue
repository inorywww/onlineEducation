<template>
    <div class="subject">
        <div class="subject-all">
            <all/>
        </div>
        <div class="subject-add">
            <add/>
        </div>
    </div>
</template>

<script>
import Add from './Add'
import All from './All'

export default {
    components: { All,Add },
    name:'subject'
}
</script>

<style lang="scss" scoped>
.subject{
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto 12px;
    & > div{
        flex:1;
    }
}
</style>