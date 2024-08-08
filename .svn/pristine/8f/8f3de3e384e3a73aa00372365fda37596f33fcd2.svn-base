<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-24 09:48:11
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <div
        class="m-2 inline-block w-72 cursor-pointer text-wrap break-words rounded-md text-center transition-colors duration-200 hover:bg-gray-100"
        :key="item"
        :style="{
            color: getBaseTagColor(),
            fontSize:
                Math.random() > 0.5
                    ? Math.random() < 0.3
                        ? Math.random() < 0.8
                            ? '10px'
                            : '20px'
                        : '30px'
                    : '70px',
        }"
        v-for="item in prop.data"
    >
        {{ item }}
    </div>
</template>
<script setup lang="ts">
import { getBaseTagColor } from '@/utils';
defineOptions({
    name: 'Tag',
});
interface Prop {
    data: string[] | any;
}
const prop = withDefaults(defineProps<Prop>(), {
    data: [] as string[],
});
</script>
