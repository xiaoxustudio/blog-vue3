/*
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-28 14:30:29
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
 */
import { ArticleData, ClassData, UserData } from '@/utils';
import { defineStore } from 'pinia';

/**
 * @description: 存储用户信息
 * @return {*}
 */
export const useInfoStore = defineStore('userinfo', {
    state: () =>
        ({ is_login: false, username: '', user_id: '', token: '' }) as UserData & {
            is_login: boolean;
        },
    persist: true,
});

/**
 * @description: 存储菜单选择
 * @return {*}
 */
export const useSelectMenuStore = defineStore('page', {
    state: () => ({ select: 0, userselect: '0', adminselect: '0' }),
    persist: true,
});
/**
 * @description: 存储文章菜单分类选择
 * @return {*}
 */
export const useArticleSelectStore = defineStore('ArticleSelect', {
    state: () => ({ select: 0 }),
    persist: true,
});

// 其他store
export const useArticleStore = defineStore('Article', {
    state: () => ({}) as ArticleData,
    persist: true,
});
export const useClassStore = defineStore('Class', {
    state: () => ({}) as ClassData,
    persist: true,
});
export const useUserInfoParamsStore = defineStore('UserInfoParams', {
    state: () => ({ user_id: '' }),
    persist: true,
});
export const useChatIntervalStore = defineStore('ChatInterval', {
    state: () => ({ interval: 1000 }),
    persist: true,
});
