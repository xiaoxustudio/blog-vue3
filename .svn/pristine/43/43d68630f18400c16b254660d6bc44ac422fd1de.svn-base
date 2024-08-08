<template>
    <div class="h-full w-full">
        <div
            class="w-full columns-2xl gap-5 bg-white px-5 py-2 shadow-sm transition-shadow duration-200 hover:shadow"
        >
            <Tag :data="tags"></Tag>
        </div>
    </div>
</template>
<script setup lang="ts">
import { API_Type, postData } from '@/utils';
defineOptions({
    name: 'Tags',
});
const tags = ref<string[]>([]);
onMounted(() => {
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
