<template>
    <div class="app-conatiner">
        <header-bar/>
        <keep-alive>
            <router-view />
        </keep-alive>
        <footer-bar/>
        <tool-bar/>
    </div>
</template>

<script>
import HeaderBar from './compoments/HeaderBar'
import FooterBar from './compoments/FooterBar'
import ToolBar from './compoments/ToolBar.vue'

export default {
    name:'layoutHome',
    components:{
        HeaderBar,
        FooterBar,
        ToolBar
    },
}
</script>

<style lang="scss" scoped>

</style>
