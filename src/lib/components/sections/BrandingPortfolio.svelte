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
</script>

<section id="branding">
	<div class="container">

		<!-- Header -->
		<div class="section-header">
			<span class="section-tag tag-in" use:inview>Branding</span>
			<h2 class="heading-in" use:inview>
				<span class="lw"><span class="lt">Identity that</span></span>
				<span class="lw"><span class="lt"><em class="accent">speaks</em>.</span></span>
			</h2>
			<p class="section-desc para-in" use:inview={{ delay: 300 }}>
				From concept to execution — logos, print, and stationery that carry your brand everywhere.
			</p>
		</div>

		<!-- Logos -->
		<div class="category cat-in" use:inview>
			<h3 class="cat-label">Logo Design</h3>
			<div class="logos-grid">
				{#each logos as logo, i}
					<div class="logo-card" style="--i:{i}" use:inview={{ delay: i * 60 }}>
						<img src={logo.src} alt={logo.alt} loading="lazy" />
					</div>
				{/each}
			</div>
		</div>

		<!-- Business Cards -->
		<div class="category cat-in" use:inview>
			<h3 class="cat-label">Business Cards</h3>
			<div class="cards-grid">
				{#each cards as card, i}
					<div class="print-card" style="--i:{i}" use:inview={{ delay: i * 100 }}>
						<img src={card.src} alt={card.alt} loading="lazy" />
					</div>
				{/each}
			</div>
		</div>

		<!-- Letterhead / Stationery -->
		<div class="category cat-in" use:inview>
			<h3 class="cat-label">Stationery</h3>
			<div class="stationery-grid">
				{#each stationery as item}
					<div class="print-card wide" use:inview>
						<img src={item.src} alt={item.alt} loading="lazy" />
					</div>
				{/each}
			</div>
		</div>

	</div>
</section>

<style>
	section { padding: var(--section-pad) 0; }

	/* ── Header ─────────────────────────────── */
	.section-header { margin-bottom: 72px; }

	.tag-in:global(.inview-ready) {
		opacity: 0;
		transform: translateY(-18px) scale(0.88);
		transition: opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
		            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
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
	.lt {
		display: block;
		transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.lw:nth-child(2) .lt { transition-delay: 0.1s; }

	.heading-in:global(.inview-ready) .lt {
		transform: translateY(115%) skewY(6deg);
		transform-origin: left bottom;
	}
	.heading-in:global(.inview-ready.visible) .lt { transform: translateY(0) skewY(0deg); }

	.accent { font-style: normal; color: var(--color-accent); }

	.section-desc {
		font-size: 1rem;
		max-width: 520px;
		transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease;
	}
	.para-in:global(.inview-ready) { opacity: 0; transform: translateY(24px); filter: blur(4px); }
	.para-in:global(.inview-ready.visible) { opacity: 1; transform: translateY(0); filter: blur(0); }

	/* ── Category blocks ─────────────────────── */
	.category { margin-bottom: 72px; }

	.cat-in {
		transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.cat-in:global(.inview-ready) { opacity: 0; transform: translateY(40px); }
	.cat-in:global(.inview-ready.visible) { opacity: 1; transform: translateY(0); }

	.cat-label {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-text-dim);
		margin-bottom: 24px;
		padding-bottom: 16px;
		border-bottom: 1px solid var(--color-border);
	}

	/* ── Logos grid ──────────────────────────── */
	.logos-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2px;
	}

	.logo-card {
		background: var(--color-surface);
		overflow: hidden;
		aspect-ratio: 4/3;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		position: relative;
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.logo-card:hover { transform: scale(1.04); z-index: 2; }

	.logo-card img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 24px;
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.logo-card:hover img { transform: scale(1.06); }

	/* rounded corners on corner cells */
	.logo-card:first-child { border-radius: 12px 0 0 0; }
	.logo-card:nth-child(3) { border-radius: 0 12px 0 0; }
	.logo-card:nth-child(7) { border-radius: 0 0 0 12px; }
	.logo-card:nth-child(9) { border-radius: 0 0 12px 0; }

	/* ── Print cards ─────────────────────────── */
	.cards-grid,
	.stationery-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.print-card {
		border-radius: 12px;
		overflow: hidden;
		background: var(--color-surface);
		cursor: pointer;
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
		            box-shadow 0.4s ease;
	}
	.print-card:hover {
		transform: scale(1.03) translateY(-4px);
		box-shadow: 0 24px 60px rgba(0,0,0,0.5);
	}
	.print-card.wide { grid-column: span 2; }

	.print-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.print-card:hover img { transform: scale(1.04); }

	/* ── Mobile ──────────────────────────────── */
	@media (max-width: 768px) {
		.logos-grid { grid-template-columns: repeat(2, 1fr); }
		.logo-card:first-child { border-radius: 12px 0 0 0; }
		.logo-card:nth-child(2) { border-radius: 0 12px 0 0; }
		.logo-card:nth-child(3),
		.logo-card:nth-child(7) { border-radius: 0; }
		.logo-card:nth-child(8) { border-radius: 0 0 12px 0; }
		.logo-card:nth-child(9) { border-radius: 0 0 12px 12px; }

		.cards-grid,
		.stationery-grid { grid-template-columns: 1fr; }
		.print-card.wide { grid-column: span 1; }
	}
</style>
