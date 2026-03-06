<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	const isStandalone = $derived($page.url.pathname.startsWith('/brandIdentityQuestionnaire'));
</script>

{#if !isStandalone}<Nav />{/if}
{@render children()}
{#if !isStandalone}<Footer />{/if}
