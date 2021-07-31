<template>
    <div class="container">
        <div class="title">
            <span>主讲讲师</span>
        </div>
        <div class="info-box">
            <router-link :to="`/teacher/${course.teacherId}`">
                <div class="avatar">
                    <img :src="course.avatar" alt="image">
                </div>
            </router-link>
            <div class="info">
                <h1 class="name">{{course.teacherName}}</h1>
                <p class="intro">{{course.intro}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'teacherInfo',
    props:{
        course:Object,
    }
}
</script>

<style lang="scss" scoped>
.container{
    background-color: $c-card;
    .title{
        border-bottom: $border;
        padding: 8px 12px;
        span{
            font-size: $text-medium;
            padding: 8px 12px;
            width: 95%;
            color: $c-green;
            border-bottom:1px solid $c-green;
            font-size: $text-medium;
        }
    }
    .info-box{
        @include left;
        padding: 30px;
        .avatar{
            img{
                width: 150px;
                height: 150px;
                border-radius: 50%;
            }
        }
        .info{
            margin:0 auto;
            .name{
                font-size: $text-big;
                padding: 20px 0;
            }
            .intro{
                font-size: $text-medium;
            }
        }
    }
}
</style>