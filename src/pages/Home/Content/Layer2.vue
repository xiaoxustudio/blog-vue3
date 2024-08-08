<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-24 09:31:24
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <div class="flex gap-2">
        <div class="w-full gap-5">
            <!-- 卡片 -->
            <el-skeleton :loading="is_ready" animated>
                <template #default>
                    <ArticleCard
                        :key="item.id + item.article_id"
                        v-for="item in list"
                        :data="item"
                    ></ArticleCard>
                </template>
            </el-skeleton>
        </div>
        <div class="w-1/3 gap-5">
            <!-- 标签 -->
            <div
                class="w-full columns-2xl gap-5 bg-white px-5 py-2 shadow-sm transition-shadow duration-200 hover:shadow"
            >
                <el-tag
                    class="m-2 cursor-pointer"
                    :key="item"
                    effect="dark"
                    :color="getBaseTagColor()"
                    v-for="item in tags"
                    >{{ item }}</el-tag
                >
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { API_Type, getBaseTagColor, postData } from '@/utils';
const tags = ref<string[]>([]);

const list = ref();
const is_ready = ref(true);

const updateArticle = async () => {
    await postData(`?type=${API_Type.list_article}`, {
        group: '',
    }).then((data) => {
        const _data = data.data;
        if (_data.status) {
            const _list = _data.data as any[];
            list.value = Array.isArray(_list) ? _list : [];
        } else {
            ElMessage.error({
                message: _data.msg,
            });
        }
    });
};
onMounted(async () => {
    is_ready.value = true;
    await updateArticle();
    is_ready.value = false;
    postData(`?type=${API_Type.tags}`, {}).then((data) => {
        const _data = data.data;
        if (_data.status) {
            tags.value =
                (Object.values(_data.data) as string[]).filter((_val) => _val.length) ?? [];
        } else {
            ElMessage.error({
                message: '获取数据失败！',
            });
        }
    });
});
</script>
<style lang="scss" scoped>
.el-icon {
    vertical-align: baseline;
}
</style>
