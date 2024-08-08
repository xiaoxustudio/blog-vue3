<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-26 17:38:57
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <el-scrollbar class="w-full" height="95vh">
        <el-skeleton :rows="5" :loading="is_ready" animated>
            <template #default>
                <el-table empty-text="暂无评论" :data="list" style="width: 100%; height: 100%">
                    <el-table-column prop="id" label="id" />
                    <el-table-column prop="comment_id" label="评论ID" />
                    <el-table-column prop="comment_like" label="评论点赞">
                        <template #default="scope">
                            <span class="w-full overflow-hidden text-ellipsis text-nowrap">
                                {{ scope.row.comment_like }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="评论内容">
                        <template #default="scope">
                            <span class="w-full overflow-hidden text-ellipsis text-nowrap">
                                {{ scope.row.comment_content }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="comment_author_id"
                        label="评论作者用户ID"
                        align="center"
                    />
                    <el-table-column prop="comment_time" label="评论发布时间" />
                    <el-table-column label="操作" width="180">
                        <template #default="scope">
                            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.row)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-skeleton>
    </el-scrollbar>
    <!-- 编辑对话框 -->
    <el-dialog
        v-model="dialogFormVisible"
        :title="`编辑评论 ${Dialog_form.comment_id}`"
        width="500"
    >
        <el-form :model="Dialog_form">
            <el-form-item label="评论作者">
                <el-text type="primary">
                    {{ Dialog_form.comment_author_id }}({{ Dialog_form.$user?.nickname }})
                </el-text>
            </el-form-item>
            <el-form-item label="评论文章ID">
                <el-text type="primary">{{ Dialog_form.comment_article_id }}</el-text>
            </el-form-item>
            <el-form-item label="评论内容">
                <el-input v-model="Dialog_form.comment_content" autocomplete="off" />
            </el-form-item>
            <el-form-item label="评论时间">
                <el-date-picker v-model="Dialog_form.comment_time" type="datetime" />
            </el-form-item>
            <el-form-item label="评论点赞">
                <div class="flex gap-2 rounded-md bg-white p-2">
                    <el-tag
                        v-for="tag in dynamicTags"
                        :key="tag"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                    >
                        {{ tag }}
                    </el-tag>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSave"> 保存 </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import emitter from '@/EventBus';
import { useInfoStore } from '@/store';
import { API_Type, postData, CommentData } from '@/utils';
import { ElInput } from 'element-plus';
const useInfo = useInfoStore();
const list = ref<CommentData[]>([]);
const Dialog_form = ref<CommentData>({
    comment_id: '',
    comment_content: '',
    comment_like: '',
    comment_author_id: '',
    comment_article_id: '',
    comment_time: '',
});
const dynamicTags = ref<string[]>(
    Dialog_form.value.comment_like.split('|').filter((_val) => _val) ?? [],
);
const TagsString = computed(() => dynamicTags.value.join('|') ?? []);

const handleClose = (tag: string) => {
    if (tag.length > 0) dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};
const is_ready = ref(true);
const dialogFormVisible = ref(false);
const handleEdit = (row: CommentData) => {
    Dialog_form.value = { ...row };
    dynamicTags.value = Dialog_form.value.comment_like.split('|').filter((_val) => _val) ?? [];
    dialogFormVisible.value = true;
};

const handleSave = () => {
    let _duplicate = { ...Dialog_form.value };
    _duplicate.comment_like = TagsString.value;
    postData(`?type=${API_Type.admin_updatesComment}`, {
        username: useInfo.username,
        token: useInfo.token,
        data: JSON.stringify(_duplicate),
    }).then((data) => {
        const _data = data.data;
        if (_data.status) {
            ElMessage.success({
                message: `保存成功`,
            });
            updateComment();
        } else {
            ElMessage.error({
                message: _data.msg,
            });
        }
    });
    dialogFormVisible.value = false;
};
const handleDelete = (row: CommentData) => {
    postData(`?type=${API_Type.admin_deleteComment}`, {
        username: useInfo.username,
        token: useInfo.token,
        id: row.comment_id,
    }).then((data) => {
        const _data = data.data;
        if (_data.status) {
            ElMessage.success({
                message: `删除评论 ${row.comment_id} 成功`,
            });
            updateComment();
        } else {
            ElMessage.error({
                message: _data.msg,
            });
        }
    });
};

const updateComment = () => {
    postData(`?type=${API_Type.admin_getCommentList}`, {}).then((data) => {
        const _data = data.data;
        if (_data.status) {
            const _list = _data.data as CommentData[];
            list.value = Array.isArray(_list) ? _list : [];
            is_ready.value = false;
        } else {
            ElMessage.error({
                message: _data.msg,
            });
        }
    });
};
onMounted(() => {
    is_ready.value = true;
    emitter.emit('handleAdmin');
    updateComment();
    console.log(dynamicTags);
});
</script>
<style scope lang="scss"></style>
