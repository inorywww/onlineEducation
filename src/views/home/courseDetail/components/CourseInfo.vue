<template>
    <div class="container">
        <div class="header">
            <span class="title">
                课程详情
            </span>
        </div>
        <div class="info-box">
            <div class="intro">
                <h1 class="title">课程介绍</h1>
                <p>{{course.description}}</p>
            </div>
            <div class="chapter">
                <h1 class="title">课程大纲</h1>
                <div class="chapter-list">
                    <el-collapse v-model="showChapterIndex">
                        <el-collapse-item 
                        v-for="(item,index) in chapters"
                        :key="index"
                        :title="item.title" 
                        :name="index">
                            <div class="video-list">
                                <a
                                v-for="(v, index1) in item.children"
                                :key="index1"
                                class="video-item"
                                @click="playVideo(v)"
                                >
                                    <div class="left">
                                        <span class="free" v-if="v.isFree">
                                            免费
                                        </span>
                                        <span>
                                            {{v.title}}
                                        </span>
                                    </div>
                                    <span class="see hv" v-if="v.isFree">
                                        预览
                                    </span>
                                    <span class="buy hv" v-else>
                                        购买
                                    </span>
                                </a>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <el-dialog
        :visible.sync="dialogVisible"
        width='50%'
        heigth="400px"
        top="15vh"
        >
            <video-player
            ref="videoPlayer"
            class="video-player vjs-custom-skin"
            :playsinline="true"
            :options="playerOptions"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            />
        </el-dialog>
    </div>
</template>

<script>
import { alert } from "@/utils/index";
export default {
    name:'courseInfo',
    props:{
        course:Object,
        chapters:Array,
    },
    data(){
        return {
            showChapterIndex:0,
            videoId:'',
            dialogVisible:false,
            playerOptions: {
                playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, // 如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                {
                    type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                    src: '' // url地址
                }
                ],
                hls: true,
                poster: '', // 你的封面地址
                width: document.documentElement.clientWidth, // 播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true // 全屏按钮
                }
            },
        }
    },
    methods:{
        playVideo(item){
            if(item.isFree){
                this.$api.vod.getPlayUrl(item.videoSourceId).then(res => {
                    if(res.data.data.playUrl){
                        this.playerOptions.sources[0].src = res.data.data.playUrl[0];
                        this.dialogVisible = true;
                    }
                    else{
                        alert('暂无视频信息！','error')
                    }
                })
            }else{
                //购买
            }
        },
        onPlayerPlay(e){
            console.log(e);
        },
        onPlayerPause(e){
            console.log(e);
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    background-color: $c-card;
    .header{
        width: 95%;
        border-bottom: $border;
        padding: 8px 12px;
        margin: 0 auto;
        .title{
            color: $c-green;
            padding: 7px;
            border-bottom:1px solid $c-green;
            font-size: $text-medium;
        }
    }
    .info-box{
        .intro{
            margin: 32px 16px;
            .title{
                padding: 4px;
                margin: 32px 0;
                font-size: $text-big;
                border-left:6px solid $c-black;
            }
            p{
                color: rgb(116, 110, 110);
                font-size: $text-medium;
                text-indent : 2em;
                line-height: 200%;
            }
        }
        .chapter{
            margin: 32px 16px;
            .title{
                padding: 4px;
                margin: 32px 0;
                font-size: $text-big;
                border-left:6px solid $c-black;
            }
            .chapter-list{
                padding-bottom: 32px;
                .video-list{
                    @include columnLeft;
                    .video-item{
                        width: 100%;
                        padding: 8px;
                        margin: 8px 0;
                        font-size: $text-medium;
                        cursor: pointer;
                        position:relative;
                        @include left;
                        justify-content: space-between;
                        .left{
                            @include left;
                            .free{
                                background-color: $c-green;
                                border-radius: 20px;
                                padding: 2px 12px;
                                margin-right: 8px;
                                color: $c-white;
                                font-size: $text-small;
                            }
                        }
                        .see{
                            opacity:0;
                            margin-right: 32px;
                            color: $c-white;
                            background-color: $c-green;
                            padding: 4px 12px;
                            font-size: $text-small;
                        }
                        .buy{
                            opacity:0;
                            margin-right: 32px;
                            color: $c-white;
                            background-color: $c-red;
                            padding: 4px 12px;
                            font-size: $text-small;
                        }
                        &:hover{
                            color:$c-black !important;
                            background-color: #f3fee8;
                            .see,.buy{
                                opacity: 1 !important;
                            }

                        }
                        &:after{
                            content: "";
                            position: absolute;
                            left: 0;
                            bottom: 2px;
                            height: 100%;
                            opacity: 0;
                            border-left: 4px solid $c-black;
                            transform: scaleY(0);
                            transition: .3s ease-in-out;
                        }
                        &:hover:after {
                            opacity: 1;
                            transform: scaleY(1);
                        }
                    }
                }
            }
        }
    }
}
</style>