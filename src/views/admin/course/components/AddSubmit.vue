<template>
    <el-card>
        <div class="course-submit">
            <div class="cover">
                <img :src="courseInfo.cover" alt="image">
            </div>
            <div class="base-info">
                <div class="title">
                    {{courseInfo.title}}
                </div>
                <div class="lesson">
                    课时：共{{courseInfo.lessonNum}}课时
                </div>
                <div class="subject">
                    所属分类：{{`${courseInfo.subject[0]}—${courseInfo.subject[1]}`}}
                </div>
                <div class="description">
                    课程描述：{{courseInfo.description}}
                </div>
                <div class="teacher">
                    课程讲师：{{courseInfo.teacherName}}
                </div>
                <div class="price">
                    ￥{{courseInfo.price.toFixed(2)}}
                </div>
            </div>
            <div class="chapter-info">
                <div class="title">课程大纲：</div>
                <el-tree
                :data="tableData"
                props="tree"
               >
                </el-tree>
            </div>
        </div>
    </el-card>
</template>

<script>
import { listMixin } from "@/utils/mixin";

export default {
    name:'courseSubmit',
    computed: {
        // 课程信息
        courseInfo: {
            get() {
                return this.$store.state.addCourseInfo
            },
            set(val) {
                return val;
            },
        },
        // 章节信息
        tableData(){
            return this.$store.state.tableData
        },
    },
    mixins: [listMixin],
}
</script>

<style lang="scss" scoped>
.course-submit{
    margin: 0 auto;
    font-size: $text-medium;
    @include left;
    .cover{
        max-width: 33%;
        img{
            width: 100%;
        }
    }
    & > div{
        flex:1;
        @include columnLeft;
    }
    .base-info{
        & > div{
            padding: 8px 0;
        }
        .price{
            color: $c-red;
            font-size:$text-large;
            padding: 16px 0;
        }
    }
    .title{
        font-size:$text-large;
        padding: 16px 0;
    }
}
</style>