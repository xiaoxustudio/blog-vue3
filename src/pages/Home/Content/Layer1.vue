<template>
    <div class="flex items-center justify-center gap-5">
        <div class="h-full flex-1"></div>
        <div class="h-full w-1/2">
            <el-carousel indicator-position="outside">
                <el-carousel-item class="relative" v-for="(item, index) in list" :key="index">
                    <img class="h-full w-full" :src="item.img" alt="" />
                    <p
                        class="carousel-bottom absolute bottom-0 left-0 w-full text-center text-white"
                    >
                        <span class="font-bold"
                            >{{ article_list[index]?.$user?.nickname || '头条' }} ：</span
                        >
                        <span>
                            {{ article_list[index]?.article_title || '大新闻' }}
                        </span>
                    </p>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="flex h-full w-1/5 flex-col gap-1">
            <div class="card-hover relative h-full w-full">
                <img class="w-full" src="../../../assets/img3.jfif" alt="" />
                <p class="carousel-bottom absolute bottom-0 left-0 w-full text-center text-white">
                    {{ article_list[article_list.length - 1]?.article_title || '大新闻' }}
                </p>
            </div>
            <div class="card-hover relative h-full w-full">
                <img class="w-full" src="../../../assets/img1.jpg" alt="" />
                <p class="carousel-bottom absolute bottom-0 left-0 w-full text-center text-white">
                    {{ article_list[article_list.length - 2]?.article_title || '大新闻' }}
                </p>
            </div>
        </div>
        <div class="flex-1"></div>
    </div>
</template>
<script lang="ts" setup>
import { API_Type, ArticleData, postData } from '@/utils';
import { ref } from 'vue';

const getImg = (_str: string) => {
    return new URL('../../../' + _str, import.meta.url).href;
};
const article_list = ref<ArticleData[]>([]);
const list = [
    {
        img: getImg('assets/img1.jpg'),
        desc: '我是轮番一',
    },
    {
        img: getImg('assets/img2.jfif'),
        desc: '我是轮番二',
    },
    {
        img: getImg('assets/img3.jfif'),
        desc: '我是轮番三',
    },
    {
        img: getImg('assets/img4.png'),
        desc: '我是轮番四',
    },
];
const updateArticle = () => {
    postData(`?type=${API_Type.list_article}`, {
        group: '',
    }).then((data) => {
        const _data = data.data;
        if (_data.status) {
            const _list = _data.data as any[];
            article_list.value = Array.isArray(_list) ? _list : [];
            article_list.value =
                article_list.value.slice(article_list.value.length - list.length) || [];
        } else {
            ElMessage.error({
                message: _data.msg,
            });
        }
    });
};
onMounted(() => {
    updateArticle();
});
</script>
<style lang="scss" scoped>
.el-carousel__item {
    h3 {
        display: flex;
        color: #475669;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    &:nth-child(2n) {
        background-color: #99a9bf;
    }
    &:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
}
.card-hover {
    cursor: pointer;
    background-color: #000;
    img {
        transition: all $base-ani linear;
        opacity: 0.7;
    }
    &:hover img {
        opacity: 1;
    }
}
.carousel-bottom {
    padding: 2px 0;
    font-weight: 400;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background-color: rgba(#000, 0.5);
    user-select: none;
}
</style>
