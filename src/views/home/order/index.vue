<template>
    <div class="order">
        <Header/>
        <order-info :order="orderInfo"/>
        <Footer :item="orderInfo"/>
    </div>
</template>

<script>
import Footer from './components/footer';
import Header from './components/header';
import OrderInfo from './components/OrderInfo';
export default {
    name:'order',
    components:{
        Header,
        OrderInfo,
        Footer
    },
    created(){
        this.getOrder();
    },
    data(){
        return {
            orderInfo:{}
        }
    },
    watch:{
        $route(to){
            if(to.name === 'order'){
               this.getOrder();
            }
        }
    },
    methods:{
        getOrder(){
            const orderId = this.$route.params.id;
            this.$api.order.getOrderInfo(orderId).then(res => {
                console.log(res.data);
                this.orderInfo = res.data.data.item;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.order{
    max-width: $max-w;
    margin: 24px auto 0 ;
}
</style>