import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
    plugins: [svelte({
        preprocess: sveltePreprocess({
            replace: [
                [/import '\//g, "import '/src/"],
                [/from '\//g, "from '/src/"]
            ],
            sourceMap: true,
            scss: {
                renderSync: true,
                includePaths: ['src/styles']
            }
        })
    })],
    server: {
        hmr: {
            // Needed for `dev` to be used from the extension
            protocol: 'ws',
            host: 'localhost'
        }
    },
    build: {
        target: ['chrome89', 'firefox89', 'esnext'],
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    }
});
