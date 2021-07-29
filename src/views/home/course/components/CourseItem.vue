<template>
    <div class="course-item">
        <div class="cover">
            <el-image :src="item.cover">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <div class="mask">
                <span class="start">开始学习</span>
            </div>
        </div>
        <div class="body">
            <h1 class="item-title">{{ item.title }}</h1>
            <span>{{item.gmtCreate}}</span>
            <div class="body-info">
                <span :class="`isFree ${item.price === 0 ? 'free' : 'paid'}`">
                    {{ item.price === 0 ? "免费" : `￥${item.price}` }}
                </span>
                <div class="view-count">
                    <span class="iconfont icon-bofangliang"></span>
                    <span>{{ item.viewCount }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "courseItem",
    props: {
        item: Object,
    },
};
</script>
<style lang="scss" scoped>
.course-item {
    background-color: $c-white;
    margin: 12px auto;
    -webkit-transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
    transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
    &:hover {
        box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
        transform: translate(0, -5px);
        transition-delay: 0s !important;
    }
    &:hover .mask{
        transform: translateY(-100%);
        background-color: rgba(0,0,0,.3);
    }
    .cover{
        overflow: hidden;
        position: relative;
        .mask{
            @include center;
            transition: all .5s ease;
            position: absolute;
            width: 100%;
            height: 100%;
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
        padding: 16px 12px;
        .item-title {
            margin-bottom: 8px;
            font-size: $text-small;
        }
        .body-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .view-count {
                @include center;
                .iconfont {
                    padding-right: 4px;
                }
            }
        }
        .free {
            color: $c-green;
        }
        .paid {
            color: $c-red;
        }
    }
}
</style>