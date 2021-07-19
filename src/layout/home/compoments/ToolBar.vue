<template>
  <div class="toolbar">
      <div class="tool-item" v-for="(item, index) in toolList" :key="index">
            <span  :class="`iconfont ${item.icon}`"
                :href="item.path"
                @click="toTop(index)">
            </span>
            
            <a class="content" :href="item.path">
                <span class="triangle"></span>
                <img v-if="item.imgSrc" :src="item.imgSrc" alt="image">
                <span v-if="item.content">{{item.content}}</span>
            </a>
            <el-divider v-if="index !== toolList.length-1"></el-divider>
      </div>
  </div>
</template>

<script>
export default {
    name:'toolbar',
    data(){
        return {
            toolList:[
                {
                    icon:'icon-chat',
                    path:'https://tb.53kf.com/code/client/10007377/1',
                    content:'现在就与学习导师聊一聊'
                },
                {
                    icon:'icon-qq',
                    path:'https://jq.qq.com/?_wv=1027&k=rywLYVnL',
                    content:'加入技术交流群',
                    imgSrc:'https://www.gulixueyuan.com/themes/june/img/toolbar/qqun.png?version=20.4.6',
                },
                {
                    icon:'icon-wechat',
                    path:'https://tb.53kf.com/code/client/10007377/1',
                    content:'关注微信',
                    imgSrc:'https://www.gulixueyuan.com/themes/june/img/toolbar/weixin-2.png?version=20.4.6',
                },
                {
                    icon:'icon-top',
                },
            ]
        }
    },
    methods:{
        toTop(index){
            if(index === this.toolList.length-1){
                document.documentElement.scrollTop = 0;
            }
            else{
                window.open(this.toolList[index].path)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.el-divider--horizontal{
    margin: 20px 0;
}
.toolbar{
    border-radius: 4px;
    position: fixed;
    bottom: 12px;
    right: 4px;
    background-color: $c-white;
    @include columnCenter;
    .tool-item:first-child{
        padding-top: 16px;
    }
    .tool-item:last-child{
        padding-bottom: 16px !important;
    }
    .triangle{
        position: absolute;
        right: 0;
        right:-10px;
        width: 10px;
        height: 10px;
        clip-path: polygon(0px 0px, 5px 10px, 10px 0px);
        transform: rotate(270deg);
    }
    .tool-item:first-child{
        position: relative;
        cursor: pointer;
        .iconfont{
            font-size: $text-large;
            color: $c-green;
        }
        .content{
            background-color: $c-white;
            position: absolute;
            color: $c-white;
            font-size: $text-medium;
            right: 55px;
            top: 0;
            width: 200px;
            padding:12px;
            background-color: $c-green;
            clear: both;
            .triangle{
                background-color: $c-green;
            }
            img{
                width: 80px;
                height: 80px;
            }
        }
    }
    .tool-item:not(:first-child){
        width: 50px;
        position: relative;
        cursor: pointer;
        @include columnCenter;
        .content{
            display: none;
            position: absolute;
            color: $c-gray;
            right: 75px;
            top: -50%;
            width: 128px;
            height: 128px;
            img{
                width: 80px;
                height: 80px;
            }
            .triangle{
                background-color: $c-white;
            }
        }
        .iconfont{
            font-size: $text-large;
            &:hover{
                color: $c-green;
            }
        }
        &:hover .content:not(:last-child){
                @include columnCenter;
                background-color: $c-white;
            }
    }
}
</style>