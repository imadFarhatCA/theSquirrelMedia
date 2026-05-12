import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Cloudflare Pages adapter — handles dynamic routes via Pages Functions automatically.
		// No more _redirects/SPA-fallback hacks; SvelteKit's router runs on the edge.
		adapter: adapter(),
		// Force absolute /_app/... asset paths. SvelteKit defaults to relative paths,
		// which breaks dynamic routes like /audit/[slug] (../_app resolves to /audit/_app).
		paths: { relative: false },
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
