<template>
    <div class="home-container">
        <header-bar/>
        <div class="content-container">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
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

<style lang="scss">
.home-container{
    @import '@/assets/style/element-green.scss';
}
</style>
