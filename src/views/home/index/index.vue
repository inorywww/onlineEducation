<template>
    <div class="home">
        <index-swiper/>
        <div class="container">
            <index-popular-course/>
        </div>
    </div>
</template>

<script>
import IndexPopularCourse from '../components/index/IndexPopularCourse.vue'
import IndexSwiper from '../components/index/IndexSwiper'
export default {
    name:'index',
    components:{
        IndexSwiper,
        IndexPopularCourse
    },
    async created(){
        await this.$store.dispatch('getIndexData');
    },
    data(){
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .home{
        .container{
            width: 60%;
            margin: 0 auto;
        }
    }
</style>