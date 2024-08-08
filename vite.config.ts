import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import vue from '@vitejs/plugin-vue';
import path from 'path';
const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig({
    resolve: {
        alias: {
            '@': pathSrc,
        },
    },
    plugins: [
        vue(),
        AutoImport({
            // Auto import functions from Vue, e.g. ref, reactive, toRef...
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],

            // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
            // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
            resolvers: [
                ElementPlusResolver(),

                // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
            ],

            dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
        }),
        ,
        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
            ],

            dts: path.resolve(pathSrc, 'components.d.ts'),
        }),

        Icons({
            autoInstall: true,
        }),
    ],
    css: {
        preprocessorOptions: {
            postcss: {
                plugins: [tailwindcss, autoprefixer],
            },
            scss: {
                additionalData: '@import "@/styles/global.module.scss";', // 添加公共样式
            },
        },
    },
    build: {
        chunkSizeWarningLimit: 1500,
        emptyOutDir: true,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },

                chunkFileNames: (chunkInfo) => {
                    const facadeModuleId = chunkInfo.facadeModuleId
                        ? chunkInfo.facadeModuleId.split('/')
                        : [];
                    const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
                    return `js/${fileName}/[name].[hash].js`;
                },

                assetFileNames: (assetInfo) => {
                    if (assetInfo.name) {
                        const info = assetInfo.name.split('.');
                        let extType = info[info.length - 1];
                        if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
                            extType = 'media';
                        } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
                            extType = 'img';
                        } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
                            extType = 'fonts';
                        }
                        return `${extType}/[name]-[hash][extname]`;
                    } else {
                        return `assets/[name]-[hash][extname]`;
                    }
                },
            },
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://blog.xuran/',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace('/api', ''),
            },
        },
        hmr: true,
    },
});
