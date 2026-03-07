<script>
	import ServiceSection from '$lib/components/solutions/ServiceSection.svelte';
	import { mainServices, additionalServices } from '$lib/data/solutions.js';
</script>

<svelte:head>
	<title>Our Solutions — The Squirrel Media</title>
	<meta name="description" content="Brand identity, web products, social media management, and more. Explore our packages and find the right fit for your business." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="page">

	<!-- ── Hero ── -->
	<header class="hero container">
		<img src="/images/logos/squirrel-logo.svg" alt="the Squirrel Media" class="hero-logo" />
		<span class="hero-tag">Packages & Pricing</span>
		<h1>Our Solutions</h1>
		<p class="hero-sub">A spectrum of options — tailored to fit every stage of your business growth. Every project is unique; these packages are starting points, not limits.</p>
		<a href="mailto:hello@thesquirrelmedia.com" class="hero-cta">Let's Talk →</a>
	</header>

	<!-- ── Main service sections ── -->
	<div class="container">
		{#each mainServices as service}
			<ServiceSection {service} />
		{/each}
	</div>

	<!-- ── Additional services ── -->
	<div class="additional-wrap">
		<div class="container">
			<div class="additional-header">
				<span class="hero-tag">Complimentary</span>
				<h2 class="additional-title">Additional Services</h2>
				<p class="additional-sub">In addition to the core packages, we offer a range of complementary services to help facilitate your business presence — online, in products, and on social media.</p>
			</div>

			<div class="additional-grid">
				{#each additionalServices as svc}
					<div class="add-card">
						<span class="add-tag">{svc.tag}</span>
						<h3>{svc.title}</h3>
						<p>{svc.description}</p>
						<a href="mailto:hello@thesquirrelmedia.com" class="add-cta">Get in touch →</a>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── CTA ── -->
	<div class="cta-wrap container">
		<div class="cta-card">
			<p class="cta-label">Open to discussion</p>
			<h2 class="cta-title">Every project is unique</h2>
			<p class="cta-text">The outlined plans and packages are rough guidelines and estimates. We reserve the right to modify prices and features according to your business needs and recommendations.</p>
			<a href="mailto:hello@thesquirrelmedia.com" class="btn-cta">Start a Conversation →</a>
		</div>
	</div>

</div>

<style>
	.page {
		padding-bottom: var(--section-pad);
	}

	/* ── Hero ── */
	.hero {
		padding: clamp(60px, 10vh, 120px) 0 clamp(40px, 6vh, 80px);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0;
	}

	.hero-logo {
		height: 48px;
		width: auto;
		margin-bottom: 36px;
	}

	.hero-tag {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-accent);
		background: rgba(168, 85, 247, 0.1);
		border: 1px solid rgba(168, 85, 247, 0.25);
		border-radius: 999px;
		padding: 5px 14px;
		margin-bottom: 20px;
	}

	h1 {
		font-size: clamp(2.8rem, 7vw, 5rem);
		font-weight: 800;
		letter-spacing: -0.05em;
		color: var(--color-text);
		margin-bottom: 20px;
		line-height: 1;
	}

	.hero-sub {
		font-size: 1rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		max-width: 560px;
		margin-bottom: 32px;
	}

	.hero-cta {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		padding: 18px 44px;
		border: 1.5px solid rgba(168, 85, 247, 0.45);
		border-radius: 999px;
		color: var(--color-accent);
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		text-decoration: none;
		background: rgba(168, 85, 247, 0.06);
		backdrop-filter: blur(8px);
		transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.hero-cta:hover {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: #fff;
		transform: scale(1.05);
		box-shadow: 0 0 40px rgba(168, 85, 247, 0.35);
	}

	/* ── Additional ── */
	.additional-wrap {
		background: var(--color-surface);
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
		padding: var(--section-pad) 0;
		margin: var(--section-pad) 0;
	}

	.additional-header {
		margin-bottom: 48px;
	}

	.additional-title {
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		color: var(--color-text);
		margin: 12px 0 14px;
	}

	.additional-sub {
		font-size: 0.92rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		max-width: 600px;
	}

	.additional-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}

	.add-card {
		padding: 36px 32px;
		background: linear-gradient(160deg, rgba(168,85,247,0.13) 0%, var(--color-surface) 55%);
		border: 1px solid rgba(168, 85, 247, 0.45);
		border-top: 3px solid rgba(168, 85, 247, 0.7);
		border-radius: 18px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		box-shadow: 0 4px 24px rgba(168, 85, 247, 0.1);
		transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
	}
	.add-card:hover {
		border-color: rgba(168, 85, 247, 0.7);
		border-top-color: var(--color-accent);
		box-shadow: 0 8px 40px rgba(168, 85, 247, 0.22);
		transform: translateY(-4px);
	}

	.add-tag {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: rgba(168, 85, 247, 0.14);
		border: 1px solid rgba(168, 85, 247, 0.35);
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		color: var(--color-accent);
	}

	.add-card h3 {
		font-size: 1.15rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--color-text);
	}

	.add-card p {
		font-size: 0.87rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		flex: 1;
	}

	.add-cta {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--color-accent);
		text-decoration: none;
		transition: gap 0.2s ease, color 0.2s ease;
	}
	.add-cta:hover {
		gap: 10px;
		color: var(--color-accent-hover);
	}

	/* ── CTA ── */
	.cta-wrap {
		padding-bottom: 0;
	}

	.cta-card {
		padding: 56px 60px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
	}

	.cta-label {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.cta-title {
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		color: var(--color-text);
		margin: 0;
	}

	.cta-text {
		font-size: 0.88rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		max-width: 520px;
	}

	.btn-cta {
		margin-top: 8px;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 14px 36px;
		border-radius: 999px;
		background: var(--color-accent);
		color: #fff;
		font-size: 0.92rem;
		font-weight: 700;
		text-decoration: none;
		letter-spacing: 0.01em;
		transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
	}
	.btn-cta:hover {
		background: var(--color-accent-hover);
		transform: scale(1.03);
		box-shadow: 0 0 28px rgba(168, 85, 247, 0.35);
		color: #fff;
	}

	/* ── Mobile ── */
	@media (max-width: 700px) {
		.additional-grid { grid-template-columns: 1fr; }
		.cta-card { padding: 36px 24px; }
	}
</style>
