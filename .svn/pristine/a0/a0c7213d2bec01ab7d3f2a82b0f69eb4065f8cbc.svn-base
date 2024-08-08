<!--
 * @Author: xuranXYS
 * @LastEditTime: 2024-06-26 21:37:20
 * @GitHub: www.github.com/xiaoxustudio
 * @WebSite: www.xiaoxustudio.top
 * @Description: By xuranXYS
-->
<template>
    <div class="flex h-full w-full items-center justify-center">
        <div class="rounded-md bg-white p-5 transition-all duration-200 hover:shadow-md">
            <h1 class="py-5 text-3xl font-bold">注册</h1>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                label-width="auto"
                style="min-width: 400px"
                :rules="rules"
            >
                <el-form-item prop="username" label="用户名">
                    <el-input
                        v-model="ruleForm.username"
                        placeholder="请输入用户名"
                        type="text"
                        clearable
                    />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input
                        v-model="ruleForm.password"
                        placeholder="请输入密码"
                        type="password"
                        clearable
                    />
                </el-form-item>
                <el-form-item prop="repassword" label="重复密码">
                    <el-input
                        v-model="ruleForm.repassword"
                        placeholder="请重新输入密码"
                        type="password"
                        clearable
                    />
                </el-form-item>
                <el-form-item prop="code" label="验证码" class="select-none">
                    <el-col :span="12">
                        <el-input v-model="ruleForm.code" type="text" clearable />
                    </el-col>
                    <el-col :span="12">
                        <canvas
                            ref="canvas_ref"
                            width="100"
                            height="26"
                            @click="buildCode()"
                            class="cursor-pointer"
                        ></canvas>
                    </el-col>
                </el-form-item>
                <el-form-item label="是否是管理员">
                    <el-switch v-model="ruleForm.is_admin" />
                </el-form-item>
                <el-form-item>
                    <div class="flex w-full items-center justify-center">
                        <el-button type="primary" @click="onSubmit(ruleFormRef)">注册</el-button>
                        <el-button @click="$router.push('login')">登录</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { API_Type, BuildCode, postData } from '@/utils';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { reactive } from 'vue';
const ruleFormRef = ref<FormInstance>();
interface RuleForm {
    username: string;
    password: string;
    repassword: string;
    code: string;
    is_admin: boolean;
}
const ruleForm = reactive<RuleForm>({
    username: '',
    password: '',
    repassword: '',
    code: '',
    is_admin: false,
});
let rcode = '';
const rules = reactive<FormRules<typeof ruleForm>>({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    repassword: [{ required: true, message: '请重新输入密码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});
const canvas_ref = ref<HTMLCanvasElement>();
const buildCode = () => {
    rcode = Math.random().toString(32).padEnd(4, '0').substring(2, 6);
    BuildCode(canvas_ref, rcode);
};
const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
        if (valid) {
            if (rcode !== ruleForm.code) {
                ElMessage.error({
                    message: '验证码错误，请重试！',
                });
            } else if (ruleForm.password !== ruleForm.repassword) {
                ElMessage.error({
                    message: '两次密码不一致，请重试！',
                });
            } else {
                postData(`?type=${API_Type.register}`, {
                    ...ruleForm,
                }).then((_res) => {
                    const _data = _res.data;
                    if (_data.status) {
                        ElMessage.success({
                            message: '注册成功！',
                        });
                        setTimeout(() => router.push('login'), 500);
                    } else {
                        ElMessage.error({
                            message: '注册失败，请重试！',
                        });
                    }
                });
            }
        } else {
            ElMessage.error({
                message: '信息填写错误，请重试！',
            });
        }
        formEl.resetFields();
        buildCode();
    });
};
onMounted(() => {
    buildCode();
});
</script>
