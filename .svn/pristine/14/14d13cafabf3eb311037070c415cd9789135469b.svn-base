<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-26 16:38:01
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <el-descriptions
        :column="5"
        direction="vertical"
        border
        v-for="(item, index) in list"
        :key="index"
    >
        <el-descriptions-item label="API 名称"> {{ item.name }} </el-descriptions-item>
        <el-descriptions-item label="提交方式">
            {{ item.methods.toUpperCase() }}
        </el-descriptions-item>
        <el-descriptions-item label="地址"> {{ item.address }} </el-descriptions-item>
        <el-descriptions-item label="返回"> {{ item.return }} </el-descriptions-item>
        <el-descriptions-item label="参数">
            <el-descriptions
                :column="1"
                direction="vertical"
                border
                v-for="(_sub, sub_index) in item.params"
                :key="sub_index"
            >
                <el-descriptions-item :label="_sub.title">
                    {{ _sub.desc }}
                </el-descriptions-item>
            </el-descriptions>
        </el-descriptions-item>
    </el-descriptions>
</template>
<script setup lang="ts">
import emitter from '@/EventBus';

const list = [
    {
        name: '登录',
        methods: 'post',
        address: '/login',
        return: 'UserData',
        params: [
            {
                title: '参数1：username',
                desc: '用户名',
            },
            {
                title: '参数2：password',
                desc: '密码',
            },
        ],
    },
    {
        name: '注册',
        methods: 'post',
        address: '/addUser',
        return: '无',
        params: [
            {
                title: '参数1：username',
                desc: '用户名',
            },
            {
                title: '参数2：password',
                desc: '密码',
            },
        ],
    },
];
emitter.emit('handleAdmin');
</script>
<style scope lang="scss">
.cell-item {
    margin-right: 0;
}
</style>
