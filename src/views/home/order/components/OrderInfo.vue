<template>
    <div class="order-info">
        <div class="table-header">
            <span class="course">
                商品
            </span>
            <div class="price-box">
                <span class="origin-price">原价</span>
                <span>价格</span>
            </div>
        </div>
        <div class="table-body">
            <div class="list">
                <div class="teacher">
                   讲师：{{order.teacherName}}
                </div>
                <div class="course-info">
                        <div class="left">
                            <div class="cover">
                                <img :src="order.courseCover" alt="image">
                            </div>
                            <h1 class="course-title">
                                {{order.courseTitle}}
                            </h1>
                        </div>
                    <div class="right">
                        <span class="origin-price">￥{{order.totalFee}}</span>
                        <span>￥{{order.totalFee}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-footer">
            <p class="info-count">共
                <span>1</span>
                件商品，合计￥
                <span class="total-price">{{order.totalFee}}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name:'orderInfo',
    props:{
        order:Object
    }
}
</script>

<style lang="scss" scoped>
.order-info{
    .table-header{
        padding: 12px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $text-medium;
        background-color: $bd-gray;
        .course{
            flex: .3;
            text-align: right;
        }
        .price-box{
            flex: .4;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            .origin-price{
                color: $c-red;
            }
        }
    }
    .table-body{
        .list{
            font-size: $text-medium;
            .teacher{
                padding: 24px;
            }
            .course-info{
                border:$border;
                background-color: $c-card;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 24px;
                .left{
                    @include top;
                    flex: .9;
                    .cover{
                        img{
                            width: 200px;
                            height: 150px;
                        }
                    }
                    .course-title{
                        font-size: $text-big;
                        padding: 12px;
                    }
                }
                .right{
                    flex: .5;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    .origin-price{
                        color: $c-red;
                    }
                }
            }
        }
    }
    .table-footer{
        @include right;
        height: 100px;
        width: 100%;
        background-color: $bd-gray;
        .info-count{
            padding: 12px 24px;
            font-size: $text-big;
            span{
                color:$c-red;
            }
            .total-price{
                font-size: $text-large !important;
            }
        }
    }
}
</style>