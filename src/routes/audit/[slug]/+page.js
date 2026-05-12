// Cannot prerender — slug is dynamic. SSR (default) means the worker renders
// the shell on each request with absolute asset paths, so /audit/<anything>
// resolves /_app/immutable/* correctly.
export const prerender = false;
