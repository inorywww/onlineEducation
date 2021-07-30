<template>
    <div class="recommend-container">
        <template v-if="list.length !== 0">
            <h1 class="title">推荐课程</h1>
                <div class="list">
                <div class="item" v-for="(item,index) in list" :key="index">
                    <router-link :to="`/course/${item.id}`">
                        <div class="cover">
                            <img :src="item.cover" alt="image">
                        </div>
                    </router-link>
                    <div class="content">
                        <router-link :to="`/course/${item.id}`">
                            <h2>{{item.title}}</h2>
                        </router-link>
                        <span :class="`isFree ${item.price === 0?'free':'paid'}`">
                            {{item.price === 0?'免费':`￥${item.price}`}}
                        </span>
                    </div>
                </div>
            </div>
        </template>
        <no-data v-else/>
    </div>
</template>

<script>
import NoData from '@/views/home/components/NoData';
export default {
    name:'recommendCourse',
    components:{NoData},
    async created(){
        await this.$api.indexFront.index().then(res => this.list = res.data.data.courseList)
    },
    data(){
        return {
            list:[]
        }
    },
}
</script>

<style lang="scss" scoped>
.recommend-container{
    .title{
        font-size: $text-big;
        border-bottom: $border;
        padding: 12px 0;
    }
    .list{
        .item{
            padding: 8px 0;
            @include left;
            align-items: flex-start;
            border-bottom: $border;
            .cover{
                img{
                    width: 110px;
                    max-width: 110px;
                    border-radius: 4px;
                }
            }
            .content{
                margin-left: 20px;
                h2{
                    padding-bottom: 16px;
                    font-size: $text-medium;
                }
                .free{
                    color: $c-green;
                }
                .paid{
                    color: $c-red;
                }
            }
        }
    }
}
</style>