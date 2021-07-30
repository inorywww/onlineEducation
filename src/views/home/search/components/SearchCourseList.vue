<template>
    <div class="search-list">
        course
    </div>
</template>

<script>
export default {
    name:'searchList',
    data(){
        return {
            searchList:[],
        }
    },
    created(){
        this.getCourseList(this.$route);
    },
    watch:{
        $route(to){
            this.getCourseList(to);
        }
    },
    methods:{
        getCourseList(to){
            const data = {
                title:to.params.title,
            }
            this.$store.commit('setSearchContent',to.params.title)
            this.$api.courseFront.getFilterCourse(data,5,1).then(res => console.log(res.data.data));
        }
    }
}
</script>

<style>

</style>