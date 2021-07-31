<template>
    <div class="pay" v-if="payInfo">
        <div class="title">
            <p>订单提交成功，请您及时付款！订单号：{{payInfo.out_trade_no}}</p>
            <p>应付金额：
                <span class="price">
                    ￥{{payInfo.total_fee}}
                </span>
            </p>
        </div>
        <div class="body">
            <h1 class="tip">请使用微信扫一扫</h1>
            <div class="wx-pay" v-if="payInfo.code_url">
                <qriously v-model="payInfo.code_url" :size="400"/>
            </div>
        </div>
    </div>
</template>

<script>
import { alert } from "@/utils/index";
export default {
    name:'pay',
    created(){
        this.getPay();
    },
    data(){
        return {
            orderInfo:{},
            wxData:{
                size:160,
            },
        }
    },
    computed:{
        payInfo(){
            return this.$store.state.payInfo;
        }
    },
    watch:{
        $route(to){
            if(to.name === 'pay'){
               this.getPay();
            }
        }
    },
    methods:{
        getPay(){
            if(this.$store.state.isLeavePay){
                this.$router.replace(`/order/${this.$store.state.isLeavePay}`)
            }
            else{
                setTimeout(() => {
                    console.log(this.payInfo);
                },1000)
                this.$store.commit('setIsLeavePay','');
                this.$store.commit('setPayTimer',
                    setInterval(() => {
                        this.$api.payLog.getPayStatus(this.payInfo.out_trade_no).then(res => {
                            console.log(res.data);
                            if(res.data.code === 20000){
                                window.clearInterval(this.$store.state.payTimer);
                                alert('支付成功！','success',1000);
                                setTimeout(() => this.$router.replace(`/course/${this.payInfo.course_id}`), 1000)
                            }
                        })
                    },2000)
                )
            }
           
        },

    }
}
</script>

<style lang="scss" scoped>
.pay{
    max-width: $max-w;
    margin: 24px auto 0 ;
    font-size: $text-medium;
    .title{
        @include left;
        justify-content: space-around;
        .price{
            font-size: $text-large !important;
            color: $c-red;
        }
    }
    .body{
        margin-top: 64px;
        text-align: center;
        border:$border;
        .tip{
            color: $c-red;
            margin: 24px 0;
        }
    }
}
</style>