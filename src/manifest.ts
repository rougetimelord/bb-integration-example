import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
	name: 'Blue Blocker Integration Example',
	description:
		'Blocks 0/0 Twitter accounts and shows how to build an integration with Blue Blocker',
	version: '1.0.0',
	author: 'rouge',
	manifest_version: 3,
	background: {
		service_worker: 'src/background.ts',
		// @ts-ignore, this sucks
		scripts: ['src/background.ts'],
		type: 'module',
	},
});
