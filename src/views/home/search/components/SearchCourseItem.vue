<template>
    <el-row class="search-item">
        <el-col class="cover" :span="10">
            <router-link :to="`/course/${item.id}`">
                <img :src="item.cover" alt="image" />
                <div class="mask">
                    <span class="start">开始学习</span>
                </div>
            </router-link>
        </el-col>
        <el-col class="body" :span="14">
            <router-link :to="`/course/${item.id}`">
                <div class="title" v-html="item.title"></div>
            </router-link>
            <div class="count">
                <span>({{ item.viewCount }})</span>
                人学习
            </div>
            <div class="description" v-html="item.description">
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "searchItem",
    props: {
        item: Object,
    },
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.search-item {
    @include top;
    border-bottom: $border;
    padding: 20px 0;
    .cover {
        position: relative;
        cursor: pointer;
        overflow: hidden;
        &:hover .mask{
            transform: translateY(-100%);
            background-color: rgba(0,0,0,.3);
            opacity: 1;
        }
        img {
            width: 100% !important;
            height: 100% !important;
        }
        .mask{
            @include center;
            transition: all .5s ease;
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            .start{
                @include center;
                width: 160px;
                height: 40px;
                color: $c-white;
                background-color: transparent;
                border-radius:30px;
                margin: 0 auto;
                border: $c-white solid 1px;
                font-size: $text-medium;
                transition: all .5s;
            }
        }
    }
    .body {
        margin: 12px 16px;
        & > div{
            margin: 8px 0;
        }
        .title{
            font-size: $text-big;
        }
        .count{
            font-size: $text-small;
        }
        .description {
            font-size: $text-small;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }
    .keyword{
        color:$c-red !important;
    }
}
</style>