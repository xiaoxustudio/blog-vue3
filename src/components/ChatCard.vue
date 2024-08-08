<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-07-01 11:21:50
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <div
        class="group m-2 rounded-md border p-4"
        :class="{
            'bg-slate-50': useInfo.user_id === prop.list.user_id,
            'border-gray-400': useInfo.user_id === prop.list.user_id,
        }"
    >
        <div class="name text-sm text-gray-700">
            <el-avatar
                class="cursor-pointer align-middle"
                :size="34"
                :src="
                    prop.list.$user && prop.list.$user.avatar?.length > 0
                        ? base_upload + prop.list.$user.avatar
                        : emptyAvatar
                "
            />
            <span class="px-2 text-center tracking-widest"
                >{{ prop.list.$user?.nickname }}
                <span>({{ prop.list.$user?.user_id }})</span>
            </span>
        </div>
        <div class="content m-2 px-2 text-xs text-gray-600">{{ prop.list.msg }}</div>
        <div class="bottom my-2 flex gap-4 text-xs">
            <div class="flex"></div>
            <div></div>
            <div class="flex w-full justify-end">
                <span class="px-1 text-gray-400">{{ prop.list.time }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useInfoStore } from '@/store';
import { ChatData, base_upload, emptyAvatar } from '@/utils';
const useInfo = useInfoStore();
defineOptions({
    name: 'ChatCard',
});
interface _Prop {
    list: ChatData;
}
const prop = withDefaults(defineProps<_Prop>(), {
    list: () => ({}) as ChatData,
});
</script>
<style scope lang="scss"></style>
