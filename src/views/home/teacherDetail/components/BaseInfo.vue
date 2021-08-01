<template>
    <div class="base-info">
        <div class="title">
            <h1>
                讲师介绍
            </h1>
        </div>
        <div class="info-box">
            <div class="avatar">
                <img :src="item.avatar" alt="image">
            </div>
            <div class="info">
                <span class="name">
                    {{item.name}}
                </span>
                <span class="career">
                    {{item.career}}
                </span>
                <p class="intro">
                    {{item.intro}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'baseInfo',
    props:{
        item:Object,
    }
}
</script>

<style lang="scss" scoped>
.base-info{
    width: 100%;
    .title{
        border-bottom: $border;
        h1{
            font-size: $text-large;
            padding: 16px;
        }
    }
    .info-box{
        display: flex;
        margin: 24px;
        .avatar{
            @include center;
            background-color: $c-card;
            width: 300px;
            height: 300px;
            img{
                width: 90%;
                height: 90%;
            }
        }
        .info{
            margin: 0 24px;
            .name{
                font-size: $text-large;
                margin:16px 0;
            }
            .career{
                font-size: $text-large;
                padding:0 16px;
            }
            .intro{
                margin: 40px 0;
                font-size: $text-big;
                color: $c-gray;
            }
        }
    }
}
</style>