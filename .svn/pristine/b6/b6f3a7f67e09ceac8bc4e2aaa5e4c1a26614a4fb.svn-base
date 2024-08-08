<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-26 15:42:32
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <div class="flex h-full w-full">
        <el-row class="h-full w-full" :gutter="20">
            <el-col :span="4">
                <h5 class="mb-2 rounded-md bg-white p-2 text-center font-bold">后台管理</h5>
                <el-menu :default-active="useSelectMenu.adminselect + ''" @select="handleSelect">
                    <el-menu-item index="1">
                        <el-icon><House /></el-icon>
                        <span>后台首页</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon><User /></el-icon>
                        <span>用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon><setting /></el-icon>
                        <span>文章管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon><ChatDotSquare /></el-icon>
                        <span>评论管理</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <RouterView :key="$route.fullPath"></RouterView>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import emitter from '@/EventBus';
import router from '@/router';
import { useInfoStore, useSelectMenuStore } from '@/store';
import { RouterView } from 'vue-router';
const useInfo = useInfoStore();
const useSelectMenu = useSelectMenuStore();

const handleSelect = (e: any) => {
    switch (e) {
        case '1':
            router.replace({
                path: '/admin/home',
            });
            break;
        case '2':
            router.replace({
                path: '/admin/user',
            });
            break;
        case '3':
            router.replace({
                path: '/admin/article',
            });
            break;
        case '4':
            router.replace({
                path: '/admin/comment',
            });
            break;
    }
    handleAdmin();
};
const handleAdmin = () => {
    if (useInfo.$state.group !== '0') {
        router.replace({ path: '/home' });
    }
};
emitter.on('handleAdmin', handleAdmin);
onMounted(() => {
    handleAdmin();
});
</script>
<style scope lang="scss"></style>
