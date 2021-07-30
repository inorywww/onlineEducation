<template>
    <div class="teacher-item">
        <router-link :to="`/teacher/${item.id}`">
            <div class="avatar">
                <img :src="item.avatar" alt="image">
            </div>
            <div class="info-body">
                <div class="name" v-html="item.name">
                </div>
                <div class="career">
                    {{item.career === ''?'暂无头衔':item.career}}
                </div>
            </div>
            <div class="intro">
                {{item.intro === ''?'暂无介绍':item.intro}}
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name:'searchTeacherItem',
    props:{
        item:Object,
    },
    data(){
        return {

        }
    },
}
</script>

<style lang="scss" scoped>
.teacher-item{
    a{
        width: 100%;
        &:hover{
            color: $c-black !important; 
        }
    }
    @include columnCenter;
    margin: 12px 0;
    -webkit-transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
    transition: all 250ms cubic-bezier(.02, .01, .47, 1);
    border:$border;
    cursor: pointer;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(48, 55, 66, 0.15);
        transform: translate(0,-5px);
        transition-delay: 0s !important;
    }
    .avatar{
        text-align: center;
        width: 100%;
        background-color: $c-card;
        padding: 8px 0 0;
        img{
            width: 180px;
            height: 180px;
            border-radius: 50%;
        }
    }
    .info-body{
        text-align: center;
        width: 100%;
        background-color: $c-card;
        .name{
            font-size: $text-big;
            padding: 16px 0 12px;
        }
        .career{
            font-size: $text-medium;
            padding-bottom: 16px;
        }
    }
    .intro{
        @include center;
        width: 100%;
        height: 100px;
        font-size: $text-medium;
    }
}
</style>