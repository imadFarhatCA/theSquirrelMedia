<script>
	import { inview } from '$lib/actions/inview.js';

	// gc = grid-column, gr = grid-row, logo = contain+padding
	const pieces = [
		{ src: '/portfolioSamples/brandIdentity/LAM%20-%20Lydia%20Tanios%20earthycolor.jpg',             name: 'LAM — Lydia Tanios',           cat: 'Logo',          gc: '1',          gr: '1',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/Semolina%20LogoBranding.jpg',                             name: 'Semolina',                     cat: 'Logo',          gc: '2 / span 2', gr: '1',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%201.jpg',                                    name: 'Siralloc',                     cat: 'Logo',          gc: '4',          gr: '1',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%202.jpg',                                    name: 'Siralloc',                     cat: 'Logo',          gc: '1',          gr: '2 / span 2', logo: true  },
		{ src: '/portfolioSamples/brandIdentity/el-Hage%20Assurances%20newLogo.jpg',                      name: 'el-Hage Assurances',           cat: 'Logo',          gc: '2',          gr: '2',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/it%20is%20Thyme%20-%20logo.jpg',                          name: 'it is Thyme',                  cat: 'Logo',          gc: '3 / span 2', gr: '2',          logo: true  },
		{ src: '/portfolioSamples/businessCards/equipeFares%20businessCard%20simulation%20002.jpg',        name: 'Equipe Farès',                 cat: 'Business Card', gc: '2',          gr: '3',          logo: false },
		{ src: '/portfolioSamples/brandIdentity/majdalani-logo.jpg',                                      name: 'Majdalani',                    cat: 'Logo',          gc: '3',          gr: '3',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/oceanFrontier%20consultingLogo.jpg',                      name: 'Ocean Frontier Consulting',    cat: 'Logo',          gc: '4',          gr: '3',          logo: true  },
		{ src: '/portfolioSamples/businessCards/majdalani%20MembershipCards%20simulation.jpg',             name: 'Majdalani',                    cat: 'Business Card', gc: '1 / span 2', gr: '4',          logo: false },
		{ src: '/portfolioSamples/brandIdentity/troikaInsurance%20logo.svg',                              name: 'Troika Insurance',             cat: 'Logo',          gc: '3',          gr: '4',          logo: true  },
		{ src: '/portfolioSamples/businessCards/troika%20businessCard.jpg',                                name: 'Troika Insurance',             cat: 'Business Card', gc: '4',          gr: '4',          logo: false },
		{ src: '/portfolioSamples/letterHead/equipeFares%20envelop%20simulation.jpg',                     name: 'Equipe Farès',                 cat: 'Stationery',    gc: '1 / span 4', gr: '5',          logo: false },
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
				Hover to reveal. Every piece built with intention.
			</p>
		</div>

		<div class="grid wall-in" use:inview>
			{#each pieces as piece, i}
				<div
					class="cell"
					class:logo={piece.logo}
					style="grid-column:{piece.gc}; grid-row:{piece.gr}; --i:{i}"
					use:inview={{ delay: i * 40 }}
				>
					<img src={piece.src} alt={piece.name} loading="lazy" />
					<div class="overlay">
						<span class="overlay-cat">{piece.cat}</span>
						<span class="overlay-name">{piece.name}</span>
					</div>
				</div>
			{/each}
		</div>

	</div>
</section>

<style>
	section { padding: var(--section-pad) 0; }

	/* ── Header ─────────────────────────────── */
	.section-header { margin-bottom: 48px; }

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

	/* ── Grid ────────────────────────────────── */
	.wall-in {
		transition: opacity 0.5s ease;
	}
	.wall-in:global(.inview-ready) { opacity: 0; }
	.wall-in:global(.inview-ready.visible) { opacity: 1; }

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: 200px;
		gap: 4px;
		border-radius: 16px;
		overflow: hidden;
	}

	/* Last row (letterhead) is taller */
	.cell[style*="gr: '5'"],
	.cell[style*="grid-row:5"] {
		grid-row: 5;
		height: 260px;
	}

	/* ── Cell ────────────────────────────────── */
	.cell {
		position: relative;
		overflow: hidden;
		cursor: pointer;
		background: var(--color-surface);
		transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1);
	}
	.cell:global(.inview-ready) { opacity: 0; transform: scale(0.94); }
	.cell:global(.inview-ready.visible) { opacity: 1; transform: scale(1); }

	.cell img {
		width: 100%; height: 100%;
		object-fit: cover;
		display: block;
		filter: grayscale(1) brightness(0.3) blur(1px);
		transform: scale(1.04);
		transition:
			filter 0.55s cubic-bezier(0.16,1,0.3,1),
			transform 0.55s cubic-bezier(0.16,1,0.3,1);
	}
	.cell.logo img {
		object-fit: contain;
		padding: 20px;
	}

	.cell:hover img {
		filter: grayscale(0) brightness(1) blur(0);
		transform: scale(1.08);
	}
	.cell.logo:hover img {
		transform: scale(1.06);
	}

	/* ── Overlay label ───────────────────────── */
	.overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		padding: 18px 20px;
		background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%);
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	.cell:hover .overlay { opacity: 1; }

	.overlay-cat {
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: 4px;
	}
	.overlay-name {
		font-size: 0.92rem;
		font-weight: 700;
		color: #fff;
		letter-spacing: -0.01em;
	}

	/* ── Mobile ──────────────────────────────── */
	@media (max-width: 768px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 150px;
		}
		.cell {
			grid-column: auto !important;
			grid-row: auto !important;
		}
		/* Always show overlay on mobile (no hover) */
		.overlay { opacity: 1; }
		.cell img {
			filter: grayscale(0) brightness(0.75) blur(0);
			transform: scale(1);
		}
	}
</style>
