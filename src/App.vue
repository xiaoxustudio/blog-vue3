<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-25 20:41:40
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->

<template>
    <Head></Head>
    <div class="w-full">
        <div class="container_tw min-h-[500px] w-5/6">
            <Suspense>
                <RouterView :key="$route.fullPath + $route.hash"></RouterView>
            </Suspense>
        </div>
    </div>
    <Footer></Footer>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import Footer from '@/components/Footer.vue';
import Head from '@/components/Head.vue';
</script>
<style scoped>
div.container_tw {
    margin: 30px auto 0;
    overflow: hidden;
}
</style>
