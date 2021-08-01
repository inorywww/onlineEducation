<template>
    <div class="container">
        <div class="cover">
            <img :src="item.cover" alt="image">
        </div>
        <div class="info-box">
            <div class="count-box">
                <div class="buy-count">
                    <span>购买数</span>
                    <span class="num">{{item.buyCount}}</span>
                </div>
                <div class="lesson-count">
                    <span>课时数</span>
                    <span class="num">{{item.lessonNum}}</span>
                </div>
                <div class="view-count">
                    <span>浏览数</span>
                    <span class="num">{{item.viewCount}}</span>
                </div>
            </div>
            <div class="info">
                <div class="course">
                    <h1 class="title">{{item.title}}</h1>
                    <p class="price">
                        价格：
                        <span v-if="item.price !==0 && !isBuy" class="paid">￥{{item.price}}</span>
                        <span v-if="item.price === 0" class="free">免费</span>
                        <span v-if="isBuy" class="free">已购</span>
                    </p>
                </div>
                <div class="teacher">
                    <p class="name">
                        主讲：
                        <span>{{item.teacherName}}</span>
                    </p>
                    <span class="buy hvr-shadow" v-if="item.price !== 0 && !isBuy" @click="buyCourse(item)">
                        立即购买
                    </span>
                    <span class="free hvr-shadow" v-if="item.price === 0">
                        免费观看
                    </span>
                    <span class="free hvr-shadow" v-if="isBuy">
                        立即观看
                    </span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { alert } from "@/utils/index";
export default {
    name:'baseInfo',
    props:{
        item:Object,
        isBuy:Boolean,
    },
    methods:{
        buyCourse(item){
            this.$api.order.createOrder(item.id).then(res => {
                if(res.data.code === 20000){
                    alert('创建订单成功！','success',1000);
                    setTimeout(() => {
                        this.$router.push(`/order/${res.data.data.orderId}`)
                    },1000)
                }
                else{
                    alert('创建订单失败，网络错误！','error')
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.container{
    @include center;
    width: 100%;
    height: 330px;
    margin: 24px 0;
    .cover{
        width: 50%;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .info-box{
        @include left;
        width: 50%;
        color: $c-white;
        flex: 1;
        height: 100%;
        .count-box{
            @include columnCenter;
            background: #9F5754;
            flex: 1;
            height: 100%;
            padding: 0 12px;
            & >div{
                font-size: $text-small;
                border-bottom: $border;
                width: 95%;
                flex: 1;
                @include columnCenter;
                .num{
                    margin: 4px auto;
                    font-size: $text-medium;
                }
            }
        }
        .info{
            @include columnLeft;
            flex: 3;
            background-color: #244666;
            height: 100%;
            font-size: $text-medium;
            .course{
                margin: 0 auto;
                flex: 2;
                padding: 12px 20px;
                width: 90%;
                border-bottom: $border;
                .title{
                   padding: 12px 0;
                }
                .price{
                    span{
                        font-size: $text-large;
                    }
                }
                .free{
                    color: $c-green !important;
                }
                .paid{
                    color:$c-red !important;
                }
            }
            .teacher{
                flex: 3;
                padding: 12px 20px;
                width: 90%;
                margin: 0 auto;
                .name{
                    margin: 20px 0 40px;
                }
                .buy{
                    color: $c-white;
                    background-color: $c-green;
                    padding: 8px 30px;
                    font-size: $text-medium;
                    transition: all .3s ease;
                    cursor: pointer;
                    border-radius: 30px;
                    &:hover{
                        color: $c-white !important;
                        background-color: #389e51;
                    }
                }
                .free{
                    color: $c-white;
                    background-color: #FF7E56;
                    padding: 8px 30px;
                    font-size: $text-medium;
                    transition: all .3s ease;
                    cursor: pointer;
                    border-radius: 30px;
                    &:hover{
                        color: $c-white !important;
                    }
                }
            }
        }
    }
}
</style>