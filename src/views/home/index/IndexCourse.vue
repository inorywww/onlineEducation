<template>
  <div class="course-box">
        <div class="title-box">
          <h1  class="title">{{courseItem.title}}</h1>
            /
          <router-link class="subTitle" to="">{{courseItem.subTitle}}</router-link>
        </div>
        <div class="course-list">
            <router-link 
            class="course-item" 
            v-for="(item, index) in courseItem.courses" 
            :key="index"
            :to="item.path"
            >
                <el-card class="course-item">
                    <img :src="item.imgSrc" alt="image" class="cover">
                    <div class="course-info">
                        <div class="course-title">{{item.title}}}</div>
                        <div class="course-other">
                            span
                        </div>
                    </div>

                </el-card>
            </router-link>
           
        </div>
  </div>
</template>

<script>
export default {
    name:'courseBox',
    created(){

    },
    props:{
        courseItem:Object
    },
    data(){

    }
}
</script>

<style lang="scss" scoped>

</style>