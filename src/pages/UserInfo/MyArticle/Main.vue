<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-25 11:12:16
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <div class="w-full">
        <div class="m-2 flex w-full items-center justify-end"></div>
        <el-scrollbar class="w-full overflow-hidden p-2" height="98vh">
            <el-skeleton :loading="is_ready" animated>
                <template #default>
                    <ArticleCard
                        :key="item.id + item.article_id"
                        v-for="item in list"
                        :data="item"
                    ></ArticleCard>
                </template>
            </el-skeleton>
            <!-- 卡片 -->
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { useInfoStore } from '@/store';
import { API_Type, ArticleData, ClassData, postData } from '@/utils';

const UseUserInfo = useInfoStore();
const classList = ref<ClassData[]>([]);

const is_ready = ref(true);

let list = ref<ArticleData[]>([]);

const updateArticle = () => {
    postData(`?type=${API_Type.get_myarticle}`, {
        token: UseUserInfo.token,
        username: UseUserInfo.username,
        id: UseUserInfo.user_id,
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
    await postData(`?type=${API_Type.class}`, {}).then((data) => {
        const _data = data.data;
        if (_data.status) {
            const _list = _data.data as any[];
            classList.value = Array.isArray(_list) ? _list : [];
            classList.value.unshift({
                id: '-1',
                class_id: '-1',
                class_name: '全部',
                class_desc: '全部',
            });
        } else {
            ElMessage.error({
                message: '数据错误！',
            });
        }
    });
    updateArticle();
    is_ready.value = false;
});
</script>
<style scope lang="scss"></style>
