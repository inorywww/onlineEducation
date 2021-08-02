<template>
    <div class="analyze">
        <div class="filter">
            <div class="asCate">
                <el-select
                    v-model="filterData.type"
                    placeholder="请选择类别"
                    clearable
                >
                    <el-option
                        v-for="(item, index) in types"
                        :key="index"
                        :label="item.title"
                        :value="item.name"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="asTime">
                <el-date-picker
                    v-model="filterData.time"
                    type="daterange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                >
                </el-date-picker>
            </div>
            <el-button type="primary" class="filter" @click="filter">
                查询
            </el-button>
        </div>
        <div class="content">
            <div id="chart"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import moment from "moment";
import { alert } from "@/utils/index";
export default {
    name: "analyze",
    data() {
        return {
            filterData: {
                time: [],
            },
            types: [
                {
                    name: "course_num",
                    title: "课程数量",
                },
                {
                    name: "video_view_num",
                    title: "视频数量",
                },
                {
                    name: "login_num",
                    title: "登录数量",
                },
                {
                    name: "register_num",
                    title: "注册数量",
                },
            ],
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近半年",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30 * 6
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一年",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30 * 12
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近两年",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30 * 24
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            xData:[],
            yData:[],
            title:`课程数量随着时间分布折线图（2019-06-01~${moment().locale('zh-cn').format('YYYY-MM-DD')}）`,
        };
    },
    mounted() {
        this.$nextTick(() => {
                this.$api.analyze.showData('course_num','2019-06-01').then((res) => {
                this.xData = res.data.data.dateList;
                this.yData = res.data.data.numList;
                this.setEcharts();
            });
        })
    },
    methods: {
        filter() {
            if(!this.filterData.type){
                alert('请选择类型','error');
                return;
            }
            if(this.filterData.time.length === 0){
                alert('请选择时间范围','error');
                return;
            }
            const data = {
                type: this.filterData.type || "",
                begin: "",
                end: "",
            };
            if (this.filterData.time && this.filterData.time.length === 2) {
                data.begin = moment(this.filterData.time[0]).format(
                    "YYYY-MM-DD"
                );
                data.end = moment(this.filterData.time[1]).format("YYYY-MM-DD");
            }
            this.$api.analyze.showData(data.type, data.begin, data.end)
                .then((res) => {
                    console.log(res.data.data);
                    this.title = `课程数量随着时间分布折线图（${data.begin}~${data.end}）`
                    this.xData = res.data.data.dateList;
                    this.yData = res.data.data.numList;
                    this.setEcharts();
                });
        },
        setEcharts() {
            const myChart = echarts.init(document.getElementById('chart'));
            const options = {
                title:{
                    text: this.title,
                },
                xAxis: {
                    name:'时间',
                    data: this.xData
                },
                yAxis: {
                    name:'数量',
                    type: 'value'
                },
                series: [{
                    data: this.yData,
                    type: 'line'
                }]
            };
            myChart.setOption(options);
        },
    },
};
</script>

<style lang="scss" scoped>
.analyze {
    .filter {
        @include center;
        margin: 8px 40px;
        .asTime {
            margin: 0 8px;
        }
    }
    .content{
        width: 70vw;
        height: 70vh;
        margin: 0 auto;
        #chart{
            width: 70vw;
            height: 70vh;
        }
    }
}
</style>