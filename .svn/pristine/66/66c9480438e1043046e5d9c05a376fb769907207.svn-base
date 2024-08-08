<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-25 09:19:47
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <div class="w-full">
        <el-scrollbar class="w-full overflow-hidden p-2" height="98vh">
            <el-skeleton :loading="is_ready" animated>
                <template #default>
                    <CommentCard
                        v-for="(item, index) in CurrentData"
                        :key="
                            item.comment_id.toString() +
                            item.comment_author_id.toString() +
                            item.comment_author_id.toString()
                        "
                        :data="item"
                        :floor="index + 1"
                        readonly
                    ></CommentCard>
                </template>
            </el-skeleton>
            <!-- 卡片 -->
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { useInfoStore } from '@/store';
import { API_Type, CommentData, postData } from '@/utils';

const CurrentData = ref<CommentData[]>([]);
const UseUserInfo = useInfoStore();

const is_ready = ref(true);

const updateComment = async () => {
    await postData(`?type=${API_Type.get_mycommentlist}`, {
        id: UseUserInfo.user_id,
    }).then((data) => {
        const _data = data.data;
        if (_data.status) {
            const _list = _data.data as any[];
            CurrentData.value = Array.isArray(_list) ? _list : [];
        } else {
            ElMessage.error({
                message: _data.msg,
            });
        }
    });
};
onMounted(async () => {
    is_ready.value = true;
    await updateComment();
    is_ready.value = false;
});
</script>
<style scope lang="scss"></style>
