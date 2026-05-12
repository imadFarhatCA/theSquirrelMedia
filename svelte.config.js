import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Cloudflare Pages adapter — handles dynamic routes via Pages Functions automatically.
		// No more _redirects/SPA-fallback hacks; SvelteKit's router runs on the edge.
		adapter: adapter(),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
