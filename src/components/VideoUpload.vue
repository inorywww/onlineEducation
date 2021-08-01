<template>
    <div class="album albumvideo">
        <div>
            <div class="pic_img">
                <div class="pic_img_box">
                    <el-upload class="avatar-uploader"
                            :action="videoUrl"
                            v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
                            v-bind:on-progress="uploadVideoProcess"
                            v-bind:on-success="handleVideoSuccess"
                            v-bind:before-upload="beforeUploadVideo"
                            v-bind:show-file-list="false">
                        <video v-if="showVideoPath !='' && !videoFlag"
                            v-bind:src="showVideoPath"
                            class="avatar video-avatar"
                            controls="controls"
                            style="width:100%"
                            >
                            您的浏览器不支持视频播放
                        </video>
                        <i v-else-if="showVideoPath =='' && !videoFlag"
                        class="el-icon-plus avatar-uploader-icon"></i>
                        <el-progress v-if="videoFlag == true"
                            type="circle"
                            v-bind:percentage="videoUploadPercent"
                            style="margin-top:7px;"></el-progress>
                    </el-upload>
                </div>
            </div>
        </div>
        <p class="Upload_pictures">
            <span></span>
            <span>最多可以上传1个视频，建议大小50M，推荐格式mp4</span>
        </p>
    </div>
</template>

<script>
import { alert } from "@/utils/index";
import base from '@/api/admin/base';
export default {
    name:'videoUpload',
    data(){ 
        return {
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: true,
            videoUrl:`${base.vod}/uploadAlyVideo`
        }
    },
    computed:{
        showVideoPath:{
            get(){
                return this.$store.state.showVideoPath;
            },
            set(val){
                this.$store.commit('setShowVideoPath',val);
            }
        }
    },
    methods:{
        //上传前回调
        beforeUploadVideo(file) {
            var fileSize = file.size / 1024 / 1024 < 50;
            if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                alert("请上传正确的视频格式",'warning');
                return false;
            }
            if (!fileSize) {
                alert("视频大小不能超过50MB",'warning');
                return false;
            }
            this.isShowUploadVideo = false;
        },
        //进度条
        uploadVideoProcess(event, file) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage.toFixed(0) * 1;
        },
        //上传成功回调
        handleVideoSuccess(res, file) {
            this.isShowUploadVideo = true;
            this.videoFlag = false;
            this.videoUploadPercent = 0;
            //后台上传地址
            if (res.code == 20000) {
                alert('上传成功！','success');
                this.$api.vod.getPlayUrl(res.data.videoId).then(res1 => {
                    this.showVideoPath = res1.data.data.playUrl[0];
                    // 返回给父组件相关信息
                    this.$emit('videoData',{
                        size: file.size,
                        videoOriginalName: file.name,
                        videoSourceId:res.data.videoId,
                    });
                })
                
            } else {
                alert('上传失败，请重新上传','error');
            }
        }
    }
}
</script>

<style>

</style>