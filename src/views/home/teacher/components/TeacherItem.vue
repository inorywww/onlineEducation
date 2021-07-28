<template>
    <div class="teacher-item ">
        <div class="avatar">
            <router-link :to="`teacher/${item.id}`" >
                <img :src="item.avatar" alt="image" class="hvr-grow-rotate">
            </router-link>
        </div>
        <div class="teacher-info">
            <h1 class="name">{{item.name}}</h1>
            <p class="career">{{item.career}}</p>
            <p class="intro">{{item.intro}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'teacherItem',
    props:{
        item:Object,
    }
}
</script>

<style lang="scss" scoped>
.teacher-item{
    @include columnCenter;
    background-color: $c-white;
    margin: 12px 0;
    -webkit-transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
    transition: all 250ms cubic-bezier(.02, .01, .47, 1);
    &:hover{
        box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
        transform: translate(0,-5px);
        transition-delay: 0s !important;
    }
    .avatar{
        width: 200px;
        height: 200px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .teacher-info{
        margin: 12px 0;
        @include columnCenter;
        width: 100%;
        .name{
            font-size: $text-big;
            margin: 8px 0;
        }
        .career{
            color: $c-gray;
            margin: 12px 0 16px;
            text-align: center;
            font-size: $text-medium;
            display: inline-block;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            text-overflow:ellipsis;
        }
        .intro{
            color: $c-gray;
            font-size: $text-medium;
            padding: 16px 0;
            text-align: center;
            width: 90%;
            border-top: 1px solid $bd-gray;
        }
    }
}
</style>