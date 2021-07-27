<template>
    <div class="home-container">
        <header-bar/>
        <main class="main">
            <keep-alive>
                <router-view />
            </keep-alive>
        </main>
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
    background-color: $bg-color !important;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .main{
        // min-height: calc(90vh - 420px);
        flex: 1;
    }
    a{
        text-decoration: none !important;
        color:$c-black;
        &:hover{
            color: $c-green !important;
        }
    }
}
</style>
