<script>
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import WebPortfolio from '$lib/components/sections/WebPortfolio.svelte';
	import BrandingPortfolio from '$lib/components/sections/BrandingPortfolio.svelte';
	import ContactModal from '$lib/components/ContactModal.svelte';
</script>

<svelte:head>
	<title>the Squirrel Media — Creative Web Design & Branding Agency</title>
	<meta name="description" content="Creative agency specializing in web design, branding, and digital experiences. We craft identities and websites that stand out." />
</svelte:head>

<Hero />
<About />
<WebPortfolio />
<BrandingPortfolio />
<ContactModal />
