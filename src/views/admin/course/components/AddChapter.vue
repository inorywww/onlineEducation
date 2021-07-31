<template>
    <div class="course-chapter">
        <div class="container">
            <el-button
                type="primary"
                size="medium"
                @click="handleCreate('chapter')"
                icon="el-icon-circle-plus-outline"
                style="margin: 10px 0"
                >添加章节</el-button>
            <el-table
                :data="tableData"
                style="width: 100%; margin-bottom: 20px"
                border
                row-key="value"
                stripe
                size="medium"
                :tree-props="{ children: 'children' }"
            >
                <el-table-column prop="label" label="名称">
                </el-table-column>
                <el-table-column prop="sort" label="序号">
                </el-table-column>
                <el-table-column label="操作" align="right" width="180">
                    <template slot-scope="scope">
                        <el-button 
                        type="primary" 
                        class="iconfont icon-icon-test"
                        circle 
                        @click="handleCreate('video',scope.row)"
                        v-show="scope.row.location === '1'"
                        ></el-button>
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            @click="handleUpdate(scope.row)"
                            ></el-button
                        >
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="deleteClick(scope.row)"
                            ></el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                :title="textMap[dialogStatus]"
                :visible.sync="dialogFormVisible"
                width="30%"
            >
                <el-form
                    ref="dataForm"
                    :rules="rules"
                    :model="temp"
                    label-position="left"
                    label-width="120px"
                    style="margin-left: 50px"
                >
                    <el-form-item
                        v-if="sonStatus"
                        label="章节："
                        prop="parent"
                    >
                        <el-input v-model="parentName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="标签名称：" prop="label">
                        <el-input
                            v-model="temp.label"
                            size="small"
                            autocomplete="off"
                            placeholder="请输入名称"
                        ></el-input>
                    </el-form-item>
                    
                     <el-form-item
                        v-if="sonStatus"
                        label="是否免费："
                        prop="isFree"
                    >
                        <el-radio v-model="temp.isFree" :label="true">免费</el-radio>
                        <el-radio v-model="temp.isFree" :label="false">默认</el-radio>
                    </el-form-item>

                    <el-form-item label="序号：" prop="sort">
                        <el-input-number :min="1" v-model="temp.sort" label="描述文字"></el-input-number>
                    </el-form-item>

                    <el-form-item
                        v-if="sonStatus"
                        label="上传视频："
                        prop="video"
                    >
                        <video-upload @videoData="getVideoData"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size="small">
                        取消
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        @click="dialogStatus === 'create' ? createData() : updateData()"
                    >
                        确认
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script> 
import VideoUpload from '@/components/VideoUpload';
import { chapterMixin } from '@/utils/mixin'
export default {
    components: { VideoUpload },
    name: "courseChapter",
    mounted(){
        this.$store.state.tableData = [];
    },
    mixins:[chapterMixin],
    computed:{ 
        tableData(){
            return this.$store.state.tableData;
        },
    },
};
</script>

<style lang="scss" scoped>
</style> 