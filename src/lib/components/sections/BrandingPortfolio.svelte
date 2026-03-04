<script>
	import { inview } from '$lib/actions/inview.js';

	// All 13 assets merged into one mosaic wall
	// gc = grid-column, gr = grid-row, logo = use contain+padding
	const wall = [
		{ src: '/portfolioSamples/brandIdentity/LAM%20-%20Lydia%20Tanios%20earthycolor.jpg',            alt: 'LAM — Lydia Tanios',            gc: '1',          gr: '1',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/Semolina%20LogoBranding.jpg',                            alt: 'Semolina',                      gc: '2 / span 2', gr: '1',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%201.jpg',                                   alt: 'Siralloc',                      gc: '1',          gr: '2 / span 2', logo: true  },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%202.jpg',                                   alt: 'Siralloc',                      gc: '2',          gr: '2',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/el-Hage%20Assurances%20newLogo.jpg',                     alt: 'el-Hage Assurances',            gc: '3',          gr: '2',          logo: true  },
		{ src: '/portfolioSamples/businessCards/equipeFares%20businessCard%20simulation%20002.jpg',       alt: 'Equipe Farès Business Card',    gc: '2 / span 2', gr: '3',          logo: false },
		{ src: '/portfolioSamples/brandIdentity/it%20is%20Thyme%20-%20logo.jpg',                         alt: 'it is Thyme',                   gc: '1',          gr: '4',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/majdalani-logo.jpg',                                     alt: 'Majdalani',                     gc: '2',          gr: '4',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/oceanFrontier%20consultingLogo.jpg',                     alt: 'Ocean Frontier Consulting',     gc: '3',          gr: '4',          logo: true  },
		{ src: '/portfolioSamples/businessCards/majdalani%20MembershipCards%20simulation.jpg',            alt: 'Majdalani Membership Cards',    gc: '1 / span 2', gr: '5',          logo: false },
		{ src: '/portfolioSamples/brandIdentity/troikaInsurance%20logo.svg',                             alt: 'Troika Insurance',              gc: '3',          gr: '5',          logo: true  },
		{ src: '/portfolioSamples/letterHead/equipeFares%20envelop%20simulation.jpg',                    alt: 'Equipe Farès Stationery',       gc: '1 / span 2', gr: '6',          logo: false },
		{ src: '/portfolioSamples/businessCards/troika%20businessCard.jpg',                               alt: 'Troika Insurance Business Card', gc: '3',         gr: '6',          logo: false },
	];
</script>

<section id="branding">
	<div class="container">

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

		<div class="mosaic wall-in" use:inview>
			{#each wall as item, i}
				<div
					class="tile"
					class:logo={item.logo}
					style="grid-column:{item.gc}; grid-row:{item.gr}; --i:{i}"
					use:inview={{ delay: i * 45 }}
				>
					<img src={item.src} alt={item.alt} loading="lazy" />
				</div>
			{/each}
		</div>

	</div>
</section>

<style>
	section { padding: var(--section-pad) 0; }

	/* ── Header ─────────────────────────────── */
	.section-header { margin-bottom: 56px; }

	.tag-in:global(.inview-ready) {
		opacity: 0; transform: translateY(-18px) scale(0.88);
		transition: opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
	}
	.tag-in:global(.inview-ready.visible) { opacity: 1; transform: translateY(0) scale(1); }

	h2 {
		font-size: clamp(2.2rem, 4vw, 3.8rem);
		margin-top: 22px; margin-bottom: 20px;
		display: flex; flex-direction: column;
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

	/* ── Mosaic wall ─────────────────────────── */
	.wall-in {
		transition: opacity 0.6s ease;
	}
	.wall-in:global(.inview-ready) { opacity: 0; }
	.wall-in:global(.inview-ready.visible) { opacity: 1; }

	.mosaic {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: 220px;
		gap: 4px;
		border-radius: 16px;
		overflow: hidden;
	}

	.tile {
		background: var(--color-surface);
		overflow: hidden;
		cursor: pointer;
		transition:
			opacity 0.55s cubic-bezier(0.16,1,0.3,1),
			transform 0.55s cubic-bezier(0.16,1,0.3,1),
			z-index 0s;
	}
	.tile:global(.inview-ready) {
		opacity: 0;
		transform: scale(0.92);
	}
	.tile:global(.inview-ready.visible) {
		opacity: 1;
		transform: scale(1);
	}
	.tile:hover { z-index: 2; }

	.tile img {
		width: 100%; height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
	}
	.tile:hover img { transform: scale(1.07); }

	/* Logos: contain + padding so they're not cropped */
	.tile.logo img {
		object-fit: contain;
		padding: 20px;
	}

	/* ── Mobile: auto-place in 2-col grid ───── */
	@media (max-width: 768px) {
		.mosaic {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 160px;
		}
		.tile {
			grid-column: auto !important;
			grid-row: auto !important;
		}
	}
</style>
