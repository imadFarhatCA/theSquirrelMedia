<script>
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import WebPortfolio from '$lib/components/sections/WebPortfolio.svelte';
	import BrandingPortfolio from '$lib/components/sections/BrandingPortfolio.svelte';
	import ContactModal from '$lib/components/ContactModal.svelte';

	const siteUrl = 'https://thesquirrelmedia.com';
	const ogImage = `${siteUrl}/og-image.png`;
	const title = 'the Squirrel Media — Creative Web Design & Branding Agency';
	const description = 'Creative agency specializing in web design, branding, and digital experiences. We craft identities and websites that stand out.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={siteUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="the Squirrel Media — Creative Agency" />
	<meta property="og:site_name" content="the Squirrel Media" />
	<meta property="og:locale" content="en_CA" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content="the Squirrel Media — Creative Agency" />

	<!-- Structured Data: Organization + LocalBusiness -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": ["Organization", "LocalBusiness"],
		"name": "the Squirrel Media",
		"url": siteUrl,
		"logo": `${siteUrl}/images/logos/squirrel-logo.svg`,
		"image": ogImage,
		"description": description,
		"email": "hello@thesquirrelmedia.com",
		"telephone": "+15142481548",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Laval",
			"addressRegion": "QC",
			"addressCountry": "CA"
		},
		"areaServed": ["Canada", "United States"],
		"sameAs": [
			"https://instagram.com/thesquirrelmedia",
			"https://facebook.com/thesquirrelmedia",
			"https://dribbble.com/thesquirrelmedia",
			"https://linkedin.com/company/thesquirrelmedia"
		],
		"serviceType": [
			"Web Design",
			"Brand Identity",
			"UI/UX Design",
			"Digital Strategy",
			"Content Creation",
			"Hosting & Maintenance"
		],
		"priceRange": "$$"
	})}<\/script>`}
</svelte:head>

<Hero />
<About />
<WebPortfolio />
<BrandingPortfolio />
<ContactModal />
