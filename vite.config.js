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
                post1: resolve(__dirname, 'blog/post1.html'),
                post2: resolve(__dirname, 'blog/post2.html'),
            },
        },
    },
})
