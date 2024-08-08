<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-07-04 09:30:30
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <div
        class="group m-2 rounded-md border p-4"
        :class="{
            'bg-slate-50': useInfo.user_id === data.comment_author_id,
            'border-gray-400': useInfo.user_id === data.comment_author_id,
        }"
    >
        <div class="name text-sm text-gray-700">
            <el-avatar
                class="cursor-pointer align-middle"
                :size="34"
                :src="
                    data.$user && data.$user.avatar?.length > 0
                        ? base_upload + data.$user?.avatar
                        : emptyAvatar
                "
            />
            <span class="px-2 text-center tracking-widest"
                >{{ data.$user?.nickname
                }}<span class="text-xs font-bold text-gray-400"
                    >({{ data.comment_author_id }})</span
                ></span
            >
            <span class="float-end overflow-hidden text-ellipsis text-nowrap px-1 text-gray-400"
                >第{{ floor }}楼</span
            >
        </div>
        <div class="content m-2 px-2 text-xs text-gray-600" v-html="data.comment_content"></div>
        <div class="bottom my-2 flex gap-4 text-xs">
            <div class="flex">
                <el-icon color="#f00" size="16" class="align-middle"><Pointer /></el-icon>
                <span class="px-1 text-gray-400">{{ likeVal }}</span>
            </div>
            <div>
                <span class="px-1 text-gray-400"></span>
            </div>
            <div class="flex w-full justify-end">
                <span class="px-1 text-gray-400">{{ data.comment_time }}</span>
            </div>
        </div>
        <div class="bottom my-2 flex gap-4 text-xs">
            <div class="flex w-full justify-end"></div>
            <div class="flex w-full justify-end"></div>
            <div class="flex w-full justify-end"></div>
            <div class="flex w-full justify-end" v-if="useInfo.is_login && !readonly">
                <el-button
                    class="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    type="default"
                    size="small"
                    @click="submitLike"
                    >点赞</el-button
                >
                <el-button
                    v-if="useInfo.user_id === data.comment_author_id"
                    class="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    type="default"
                    size="small"
                    @click="DeleteComment"
                    >删除</el-button
                >
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useInfoStore } from '@/store';
import { API_Type, base_upload, CommentData, postData, emptyAvatar } from '@/utils';
const useInfo = useInfoStore();
defineOptions({
    name: 'CommentCard',
});
interface _Prop {
    data: CommentData;
    floor: number;
    readonly?: boolean;
    perentHandle?: { [key: string]: Function };
}
const prop = withDefaults(defineProps<_Prop>(), {
    data: () => ({}) as CommentData,
    readonly: false,
    floor: -1,
});

const sp_like = computed(() => prop.data.comment_like.split('|'));
const likeVal = computed(() => sp_like.value.filter((v) => v !== '').length ?? 0);

const submitLike = () => {
    if (useInfo.is_login) {
        postData(`?type=${API_Type.a_comment_like}`, {
            username: useInfo.username,
            token: useInfo.token,
            comment_id: prop.data.comment_id,
        }).then((data) => {
            const _data = data.data;
            if (_data.status) {
                ElMessage.success({
                    message: '点赞成功！',
                });
                prop.perentHandle?.updateArticle();
            } else {
                ElMessage.error({
                    message: _data.msg,
                });
            }
        });
    }
};
const DeleteComment = () => {
    if (useInfo.is_login) {
        postData(`?type=${API_Type.d_comment}`, {
            username: useInfo.username,
            token: useInfo.token,
            id: prop.data.comment_id,
        }).then((data) => {
            const _data = data.data;
            if (_data.status) {
                ElMessage.success({
                    message: '删除评论成功！',
                });
                prop.perentHandle?.updateArticle();
            } else {
                ElMessage.error({
                    message: _data.msg,
                });
            }
        });
    }
};
</script>
