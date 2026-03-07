<script>
	import PackageCard from './PackageCard.svelte';

	/** @type {{ service: import('$lib/data/solutions.js').mainServices[number] }} */
	let { service } = $props();
</script>

<section class="service-section" id={service.id}>
	<div class="section-intro">
		<div class="intro-top">
			<span class="tag-pill">{service.tag}</span>
			<p class="headline-small">{service.headline}</p>
		</div>
		<div class="intro-left">
			<h2>{service.label}</h2>
			<p class="sub">{service.sub}</p>
			<p class="description">{service.description}</p>
			{#if service.note}
				<p class="note">★ {service.note}</p>
			{/if}
		</div>
	</div>

	<div class="packages-grid">
		{#each service.packages as pkg, i}
			<PackageCard
				name={pkg.name}
				price={pkg.price}
				currency={pkg.currency}
				period={pkg.period}
				stars={pkg.stars}
				features={pkg.features}
				highlight={i === 1}
			/>
		{/each}
	</div>
</section>

<style>
	.service-section {
		padding: var(--section-pad) 0;
		border-top: 1px solid var(--color-border);
	}

	/* ── Intro ── */
	.section-intro {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 56px;
	}

	.intro-top {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.tag-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: rgba(168, 85, 247, 0.12);
		border: 1px solid rgba(168, 85, 247, 0.3);
		font-size: 1.3rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: var(--color-accent);
		flex-shrink: 0;
	}

	.headline-small {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-text-dim);
	}

	.intro-left {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	h2 {
		font-size: clamp(1.8rem, 3vw, 2.6rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		color: var(--color-text);
		line-height: 1.05;
	}

	.sub {
		font-size: 0.85rem;
		color: var(--color-text-dim);
		font-style: italic;
		margin-top: 4px;
	}

	.description {
		font-size: 0.92rem;
		color: var(--color-text-muted);
		line-height: 1.75;
		max-width: 560px;
		margin-top: 14px;
	}

	/* ── Packages grid ── */
	.packages-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		align-items: start;
	}

	/* ── Note ── */
	.note {
		margin-top: 24px;
		padding: 14px 20px;
		background: rgba(168, 85, 247, 0.06);
		border: 1px solid rgba(168, 85, 247, 0.2);
		border-radius: 10px;
		font-size: 0.82rem;
		color: var(--color-text-muted);
		line-height: 1.6;
		max-width: 560px;
	}

	/* ── Mobile ── */
	@media (max-width: 900px) {
		.intro-columns {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}

	@media (max-width: 700px) {
		.packages-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
