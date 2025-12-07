import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
                privacy: resolve(__dirname, 'privacy.html'),
                blog: resolve(__dirname, 'blog.html'),
                creative_renaissance: resolve(__dirname, 'blog/creative-renaissance.html'),
                beyond_blackboard: resolve(__dirname, 'blog/beyond-blackboard.html'),
                digital_minimalism: resolve(__dirname, 'blog/digital-minimalism.html'),
            },
        },
    },
})
