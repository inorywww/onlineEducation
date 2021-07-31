<template>
    <div class="footer">
        <div class="isRead">
            <el-switch
            v-model="isRead"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
            我已阅读并同意《谷粒学院购买协议》
        </div>
        <div class="buy-box">
            <router-link class="to-course" :to="`/course/${item.courseId}`">
                去订单详情页面
            </router-link>
            <div class="buy">
                <div class="count">
                    <p>共
                        <span>1</span>
                        件商品，合计￥
                        <span class="total-price">{{item.totalFee}}</span>
                    </p>
                </div>
                <span class="buy-btn hvr-shadow" @click="buyCourse">
                    立即购买
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { alert } from "@/utils/index";
export default {
    name:'orderFooter',
    props:{
        item:Object
    },
    data(){
        return {
            isRead:true,
        }
    },
    methods:{
        buyCourse(){
            if(this.isRead){
                console.log(this.item.orderNo);
                this.$api.payLog.createNative(this.item.orderNo).then(res => {
                    if(res.data.code === 20000){
                        console.log(res.data.data);
                        this.$store.commit('setPayInfo',res.data.data);
                        this.$store.commit('setIsLeavePay','');
                        this.$router.replace(`/pay/${res.data.data.out_trade_no}`)
                    }else{
                        alert('创建二维码失败，请稍后重试！','error')
                    }
                })
            }
            else{
                alert('请勾选我已阅读！','warning')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.footer{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 64px;
    .isRead{
        font-size: $text-medium;
        width: 30%;
        margin-bottom: 16px;
    }
    .buy-box{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 80px;
        border:$border;
        .to-course{
            @include center;
            font-size: $text-medium;
            margin-left: 12px
        }
        .buy{
            @include center;
            width: 30%;
            .buy-btn{
                color: $c-white;
                background-color: $c-red;
                height: 100%;
                padding: 0 30px;
                font-size: $text-medium;
                cursor: pointer;
                margin-left: 12px;
                @include center;
            }
            .count{
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
   
}
</style>