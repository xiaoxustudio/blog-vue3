<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-26 17:21:56
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <el-scrollbar class="w-full" height="95vh">
        <el-skeleton :rows="5" :loading="is_ready" animated>
            <template #default>
                <el-table empty-text="暂无文章" :data="list" style="width: 100%; height: 100%">
                    <el-table-column prop="id" label="id" />
                    <el-table-column prop="article_id" label="文章ID" />
                    <el-table-column prop="article_class" label="文章分类" align="center" />
                    <el-table-column prop="article_title" label="文章标题" />
                    <el-table-column label="文章内容">
                        <template #default="scope">
                            <span class="w-full overflow-hidden text-ellipsis text-nowrap">
                                {{ scope.row.article_content }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="article_see" label="文章阅览量" align="center" />
                    <el-table-column prop="article_time" label="文章发布时间" />
                    <el-table-column prop="author_id" label="作者用户ID" />
                    <el-table-column prop="article_tags" label="文章标签" />
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
        :title="`编辑文章 ${Dialog_form.article_id}`"
        width="700"
    >
        <el-form :model="Dialog_form">
            <el-form-item label="文章分类">
                <el-text type="primary">
                    {{ Dialog_form.article_class }}
                </el-text>
            </el-form-item>
            <el-form-item label="文章标题">
                <el-input v-model="Dialog_form.article_title" type="primary" />
            </el-form-item>
            <el-form-item label="文章内容">
                <el-input
                    v-model="Dialog_form.article_content"
                    :autosize="{ minRows: 4, maxRows: 8 }"
                    type="textarea"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="文章浏览量">
                <el-input-number v-model="Dialog_form.article_see" :min="0" />
            </el-form-item>
            <el-form-item label="文章发布时间">
                <el-date-picker v-model="Dialog_form.article_time" type="datetime" />
            </el-form-item>
            <el-form-item label="评论点赞">
                <div class="flex w-full flex-wrap gap-2 rounded-md bg-white p-2">
                    <el-tag
                        v-for="tag in dynamicTags"
                        :key="tag"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                    >
                        {{ tag }}
                    </el-tag>
                    <el-input
                        v-if="inputVisible"
                        ref="InputRef"
                        v-model="inputValue"
                        class="w-20"
                        size="small"
                        @keyup.enter="handleInputConfirm"
                        @blur="handleInputConfirm"
                    />
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">
                        + 新建标签
                    </el-button>
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
import { API_Type, postData, ArticleData } from '@/utils';
import { ElInput } from 'element-plus';
const list = ref<ArticleData[]>([]);
const is_ready = ref(true);
const useInfo = useInfoStore();
const Dialog_form = ref<ArticleData>({
    id: '',
    article_class: '',
    article_id: '',
    article_title: '',
    article_content: '',
    article_see: '',
    article_time: '',
    author_id: '',
    article_tags: '',
});
const inputValue = ref('');
const dynamicTags = ref<string[]>(
    Dialog_form.value.article_tags.split('|').filter((_val) => _val) || [],
);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
const TagsString = computed(() => dynamicTags.value.join('|') ?? []);
const handleClose = (tag: string) => {
    if (tag.length > 0) dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};
const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
        InputRef.value!.input!.focus();
    });
};

const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = '';
};
const dialogFormVisible = ref(false);
const handleEdit = (row: ArticleData) => {
    Dialog_form.value = { ...row };
    dynamicTags.value = Dialog_form.value.article_tags.split('|').filter((_val) => _val) || [];
    dialogFormVisible.value = true;
};

const handleSave = () => {
    let _duplicate = { ...Dialog_form.value };
    _duplicate.article_tags = TagsString.value;
    postData(`?type=${API_Type.admin_updatesArticle}`, {
        username: useInfo.username,
        token: useInfo.token,
        data: JSON.stringify(_duplicate),
    }).then((data) => {
        const _data = data.data;
        if (_data.status) {
            ElMessage.success({
                message: `保存成功`,
            });
            updateArticle();
        } else {
            ElMessage.error({
                message: _data.msg,
            });
        }
    });
    dialogFormVisible.value = false;
};
const handleDelete = (row: ArticleData) => {
    postData(`?type=${API_Type.admin_deleteArticle}`, {
        username: useInfo.username,
        token: useInfo.token,
        id: row.article_id,
    }).then((data) => {
        const _data = data.data;
        if (_data.status) {
            ElMessage.success({
                message: `删除文章 ${row.article_id} 成功`,
            });
            updateArticle();
        } else {
            ElMessage.error({
                message: _data.msg,
            });
        }
    });
};
const updateArticle = () => {
    postData(`?type=${API_Type.admin_getArticleList}`, {}).then((data) => {
        const _data = data.data;
        if (_data.status) {
            const _list = _data.data as ArticleData[];
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
    updateArticle();
});
</script>
<style scope lang="scss"></style>
