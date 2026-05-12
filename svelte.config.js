import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// SPA fallback so dynamic routes like /audit/[slug] work without prerendering every slug.
			// Existing pages still prerender; only routes that opt out (prerender=false) hit the fallback.
			fallback: '200.html',
			precompress: false,
			strict: false
		}),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
