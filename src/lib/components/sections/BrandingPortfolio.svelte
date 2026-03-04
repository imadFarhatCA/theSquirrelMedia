<script>
	import { inview } from '$lib/actions/inview.js';

	const logos = [
		{ src: '/portfolioSamples/brandIdentity/LAM%20-%20Lydia%20Tanios%20earthycolor.jpg', alt: 'LAM — Lydia Tanios' },
		{ src: '/portfolioSamples/brandIdentity/Semolina%20LogoBranding.jpg', alt: 'Semolina' },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%201.jpg', alt: 'Siralloc' },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%202.jpg', alt: 'Siralloc' },
		{ src: '/portfolioSamples/brandIdentity/el-Hage%20Assurances%20newLogo.jpg', alt: 'el-Hage Assurances' },
		{ src: '/portfolioSamples/brandIdentity/it%20is%20Thyme%20-%20logo.jpg', alt: 'it is Thyme' },
		{ src: '/portfolioSamples/brandIdentity/majdalani-logo.jpg', alt: 'Majdalani' },
		{ src: '/portfolioSamples/brandIdentity/oceanFrontier%20consultingLogo.jpg', alt: 'Ocean Frontier Consulting' },
		{ src: '/portfolioSamples/brandIdentity/troikaInsurance%20logo.svg', alt: 'Troika Insurance' },
	];

	const cards = [
		{ src: '/portfolioSamples/businessCards/equipeFares%20businessCard%20simulation%20002.jpg', alt: 'Equipe Farès Business Card' },
		{ src: '/portfolioSamples/businessCards/majdalani%20MembershipCards%20simulation.jpg', alt: 'Majdalani Membership Cards' },
		{ src: '/portfolioSamples/businessCards/troika%20businessCard.jpg', alt: 'Troika Insurance Business Card' },
	];

	const stationery = [
		{ src: '/portfolioSamples/letterHead/equipeFares%20envelop%20simulation.jpg', alt: 'Equipe Farès Envelope & Letterhead' },
	];

	const categories = [
		{ label: 'Logo Design', items: logos, logos: true },
		{ label: 'Business Cards', items: cards, logos: false },
		{ label: 'Stationery', items: stationery, logos: false },
	];
</script>

<section id="branding">

	<!-- Section header — full container -->
	<div class="container section-header">
		<span class="section-tag tag-in" use:inview>Branding</span>
		<h2 class="heading-in" use:inview>
			<span class="lw"><span class="lt">Identity that</span></span>
			<span class="lw"><span class="lt"><em class="accent">speaks</em>.</span></span>
		</h2>
		<p class="section-desc para-in" use:inview={{ delay: 300 }}>
			From concept to execution — logos, print, and stationery that carry your brand everywhere.
		</p>
	</div>

	<!-- Categories -->
	{#each categories as cat, ci}
		<div class="cat-row" use:inview>
			<!-- Category label row -->
			<div class="container cat-meta">
				<span class="cat-name">{cat.label}</span>
				<span class="cat-count">{String(cat.items.length).padStart(2, '0')}</span>
			</div>

			<!-- Horizontal scroll strip — bleeds edge to edge -->
			<div class="strip-wrap">
				<div class="strip" class:logo-strip={cat.logos}>
					{#each cat.items as item, i}
						<div class="strip-item" style="--i:{i}">
							<img src={item.src} alt={item.alt} loading="lazy" />
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}

</section>

<style>
	section { padding: var(--section-pad) 0; }

	/* ── Header ─────────────────────────────── */
	.section-header { margin-bottom: 80px; }

	.tag-in:global(.inview-ready) {
		opacity: 0; transform: translateY(-18px) scale(0.88);
		transition: opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
	}
	.tag-in:global(.inview-ready.visible) { opacity: 1; transform: translateY(0) scale(1); }

	h2 {
		font-size: clamp(2.2rem, 4vw, 3.8rem);
		margin-top: 22px;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
	}
	.lw { display: block; overflow: hidden; padding-bottom: 0.06em; }
	.lt { display: block; transition: transform 1s cubic-bezier(0.16,1,0.3,1); }
	.lw:nth-child(2) .lt { transition-delay: 0.1s; }

	.heading-in:global(.inview-ready) .lt { transform: translateY(115%) skewY(6deg); transform-origin: left bottom; }
	.heading-in:global(.inview-ready.visible) .lt { transform: translateY(0) skewY(0deg); }

	.accent { font-style: normal; color: var(--color-accent); }

	.section-desc {
		font-size: 1rem; max-width: 520px;
		transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s ease;
	}
	.para-in:global(.inview-ready) { opacity: 0; transform: translateY(24px); filter: blur(4px); }
	.para-in:global(.inview-ready.visible) { opacity: 1; transform: translateY(0); filter: blur(0); }

	/* ── Category row ────────────────────────── */
	.cat-row {
		margin-bottom: 80px;
		transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
	}
	.cat-row:global(.inview-ready) { opacity: 0; transform: translateY(50px); }
	.cat-row:global(.inview-ready.visible) { opacity: 1; transform: translateY(0); }

	.cat-meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding-bottom: 18px;
		margin-bottom: 20px;
		border-bottom: 1px solid var(--color-border);
	}

	.cat-name {
		font-size: clamp(1.4rem, 3vw, 2.2rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--color-text);
	}

	.cat-count {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		color: var(--color-accent);
	}

	/* ── Horizontal strip ────────────────────── */
	.strip-wrap {
		overflow-x: auto;
		overflow-y: visible;
		scrollbar-width: none;
		padding: 8px max(5%, calc((100vw - 1400px) / 2));
	}
	.strip-wrap::-webkit-scrollbar { display: none; }

	.strip {
		display: flex;
		gap: 16px;
		width: max-content;
	}

	.strip-item {
		flex: 0 0 auto;
		width: 320px;
		height: 220px;
		border-radius: 12px;
		overflow: hidden;
		background: var(--color-surface);
		cursor: pointer;
		transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
		            box-shadow 0.4s ease;
	}
	.strip-item:hover {
		transform: scale(1.04) translateY(-6px);
		box-shadow: 0 24px 60px rgba(0,0,0,0.5);
	}

	.strip-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
	}
	.strip-item:hover img { transform: scale(1.06); }

	/* Logo strip: contain so logos aren't cropped */
	.logo-strip .strip-item img {
		object-fit: contain;
		padding: 24px;
	}

	/* ── Mobile ──────────────────────────────── */
	@media (max-width: 768px) {
		.strip-item { width: 240px; height: 170px; }
	}
</style>
