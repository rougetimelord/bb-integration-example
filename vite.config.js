import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './src/manifest';

export default defineConfig(() => {
	return {
		build: {
			emptyOutDir: true,
			outDir: 'build',
			target: 'esnext',
		},
		plugins: [crx({ manifest })],
	};
});
