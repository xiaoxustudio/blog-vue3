<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-26 15:38:43
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <div class="flex h-full w-full gap-2 bg-white p-2">
        <el-row class="flex-1">
            <el-col :span="24">
                <el-menu
                    :default-active="useSelectMenu.userselect + ''"
                    :style="{
                        height: '100%',
                        width: '100%',
                    }"
                    @select="handleSelect"
                >
                    <el-menu-item
                        :key="item.name"
                        :index="index + ''"
                        v-for="(item, index) in MenuList"
                    >
                        <el-icon><component :is="item.icon"></component></el-icon>
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <div class="h-full w-10/12 bg-white p-2">
            <RouterView :key="$route.fullPath"> </RouterView>
        </div>
    </div>
</template>
<script setup lang="ts">
import router from '@/router';
import { useInfoStore, useSelectMenuStore } from '@/store';
import { RouterView } from 'vue-router';

const UseUserInfo = useInfoStore();
const useSelectMenu = useSelectMenuStore();

const MenuList = [
    {
        icon: 'document',
        name: '个人信息',
    },
    {
        icon: 'document',
        name: '我的文章',
    },
    {
        icon: 'document',
        name: '我的评论',
    },
];

const handleSelect = (e: any) => {
    useSelectMenu.$patch({
        userselect: e,
    });
    switch (e) {
        case '0':
            router.replace({
                path: `/userinfo/${UseUserInfo.user_id}/`,
            });
            break;
        case '1':
            router.replace({
                path: `/userinfo/${UseUserInfo.user_id}/myarticle`,
            });
            break;
        case '2':
            router.replace({
                path: `/userinfo/${UseUserInfo.user_id}/mycomment`,
            });
            break;
    }
};
</script>
<style scope lang="scss"></style>
