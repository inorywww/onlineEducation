<template>
    <div class="home">
        <index-swiper/>
        <div class="container">
            <index-popular-course/>
            <index-popular-teacher/>
        </div>
    </div>
</template>

<script>
import IndexPopularCourse from './components/IndexPopularCourse'
import IndexPopularTeacher from './components/IndexPopularTeacher';
import IndexSwiper from './components/IndexSwiper'
export default {
    name:'index',
    components:{
        IndexSwiper,
        IndexPopularCourse,
        IndexPopularTeacher,
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
            max-width: $max-w;
            margin: 0 auto;
        }
    }
</style>