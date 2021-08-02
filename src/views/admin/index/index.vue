<template>
    <div class="index" v-if="dataFlag">
        <el-card class="base-info">
            <div class="user-info">
                <div class="avatar">
                    <img
                        src="https://marlowe-education.oss-cn-beijing.aliyuncs.com/2021/07/27/de1ae6d88d084abeaddcac90dd00a445avatar1.jpg"
                        alt="image"
                    />
                </div>
                <div class="info">
                    <h1>admin</h1>
                    <h2>超级管理员</h2>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="other-info">
                <span>上次登录时间：</span>
                <span>上次登录地点：</span>
            </div>
        </el-card>
        <el-card style="margin: 24px auto">
            <div class="www-info">
                <h1>网站详情</h1>
                <div class="data-info">
                    <div to="/dashboard/course/list" class="info-item">
                        <div class="img">
                            <img src="/images/文章.png" alt="image" />
                        </div>
                        <div class="num-box">
                            <span class="num">{{ homeInfo[0] }}</span>
                            <span class="name">课程数量</span>
                        </div>
                    </div>

                    <div to="/dashboard/say/all" class="info-item">
                        <div class="img">
                            <img src="/images/播放.png" alt="image" />
                        </div>
                        <div class="num-box">
                            <span class="num">{{ homeInfo[1] }}</span>
                            <span class="name">播放数量</span>
                        </div>
                    </div>

                    <div to="/dashboard/article/tags" class="info-item">
                        <div class="img">
                            <img src="/images/登录.png" alt="image" />
                        </div>
                        <div class="num-box">
                            <span class="num">{{ homeInfo[2] }}</span>
                            <span class="name">登录数量</span>
                        </div>
                    </div>
                    <div to="/dashboard/message" class="info-item">
                        <div class="img">
                            <img src="/images/注册.png" alt="image" />
                        </div>
                        <div class="num-box">
                            <span class="num">{{ homeInfo[3] }}</span>
                            <span class="name">注册数量</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "dashboardHome",
    components: {},
    async created() {
        this.getData();
    },
    computed: {},
    data() {
        return {
            dataFlag: false,
            homeInfo: [],
        };
    },

    methods: {
        getData() {
            const types = [
                "course_num",
                "video_view_num",
                "login_num",
                "register_num",
            ];
            types.forEach((item) => {
                this.$api.analyze.showData(item).then((res) => {
                    this.homeInfo.push(res.data.data.numList.length);
                });
                this.dataFlag = true;
            });
        },
    },
};
</script>

<style scoped>
.index {
    width: 80%;
    margin: 0 40px;
    display: flex;
}
.index .base-info{
    margin: 0 auto;
}
.user-info {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    
}
.user-info .avatar {
    width: 150px;
    height: 150px;
    margin: 0 16px;
}
.user-info .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.user-info h1 {
    font-size: 3rem;
    
}
.other-info {
    width: 80%;
    margin: 0 auto;
}
.other-info span {
    font-size: 2rem;
    display: block;
}
.www-info h1 {
    font-size: 2rem;
    margin: 0;
}
.data-info {
    display: flex;
    flex-wrap: wrap;
    
}
.info-item img {
    max-width: 80px;
    max-height: 80px;
}
.info-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 50%;
}
.num-box .num {
    color: rgb(7, 119, 163);
    font-size: 3rem;
}
.num-box span {
    font-size: 2rem;
    margin: 0 8px;
    display: block;
}
.course {
    font-size: 2.5rem;
}
.addCoures {
    display: flex;
}
.addCoures .el-input {
    margin: 0 12px;
}
.submit-btn {
    margin: 8px 8px 0;
    text-align: right;
}
</style>