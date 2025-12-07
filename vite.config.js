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
                ai_news: resolve(__dirname, 'blog/ai-news.html'),
                education_viral: resolve(__dirname, 'blog/education-viral.html'),
            },
        },
    },
})
