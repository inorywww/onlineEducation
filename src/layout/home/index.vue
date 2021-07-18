<template>
    <div class="app-conatiner">
        <header-bar/>
        <keep-alive>
            <router-view />
        </keep-alive>
        <footer-bar/>
    </div>
</template>

<script>
import HeaderBar from './compoments/HeaderBar'
import FooterBar from './compoments/FooterBar'

export default {
    name:'layoutHome',
    components:{
        HeaderBar,
        FooterBar
    },
}
</script>

<style lang="scss" scoped>

</style>
