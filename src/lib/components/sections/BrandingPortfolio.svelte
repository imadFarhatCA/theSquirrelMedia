<script>
	import { inview } from '$lib/actions/inview.js';

	const logos = [
		{ src: '/portfolioSamples/brandIdentity/LAM%20-%20Lydia%20Tanios%20earthycolor.jpg',   name: 'LAM — Lydia Tanios'         },
		{ src: '/portfolioSamples/brandIdentity/Semolina%20LogoBranding.jpg',                   name: 'Semolina'                   },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%201.jpg',                          name: 'Siralloc'                   },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%202.jpg',                          name: 'Siralloc'                   },
		{ src: '/portfolioSamples/brandIdentity/el-Hage%20Assurances%20newLogo.jpg',            name: 'el-Hage Assurances'         },
		{ src: '/portfolioSamples/brandIdentity/it%20is%20Thyme%20-%20logo.jpg',                name: 'it is Thyme'                },
		{ src: '/portfolioSamples/brandIdentity/majdalani-logo.jpg',                            name: 'Majdalani'                  },
		{ src: '/portfolioSamples/brandIdentity/oceanFrontier%20consultingLogo.jpg',            name: 'Ocean Frontier Consulting'  },
		{ src: '/portfolioSamples/brandIdentity/troikaInsurance%20logo.svg',                    name: 'Troika Insurance'           },
	];

	const cards = [
		{ src: '/portfolioSamples/businessCards/equipeFares%20businessCard%20simulation%20002.jpg', name: 'Equipe Farès'          },
		{ src: '/portfolioSamples/businessCards/majdalani%20MembershipCards%20simulation.jpg',       name: 'Majdalani'             },
		{ src: '/portfolioSamples/businessCards/troika%20businessCard.jpg',                          name: 'Troika Insurance'      },
	];

	const stationery = [
		{ src: '/portfolioSamples/letterHead/equipeFares%20envelop%20simulation.jpg',               name: 'Equipe Farès'          },
		{ src: '/portfolioSamples/businessCards/Lam%20letterHead.jpg',                              name: 'LAM — Lydia Tanios'    },
	];

	const photography = [
		{ src: '/portfolioSamples/jewleryPhotography/imadFarhat%20artDirector%20008%20Jewerly.jpg', name: 'Jewellery'             },
		{ src: '/portfolioSamples/productsPhotography/imadFarhat%20artDirector%20005%20photography.jpg', name: 'Products'         },
	];

	const wearables = [
		{ src: '/portfolioSamples/wearablesDesign/imadFarhat%20artDirector%20007%20wearables.jpg',  name: 'Wearables'             },
	];

	const categories = [
		{
			label: 'Logo Design',
			items: logos,
			logo: true,
			cols: 4,
			tags: ['#LogoDesign', '#BrandIdentity', '#VisualIdentity', '#Typography', '#Logomark', '#Wordmark'],
		},
		{
			label: 'Business Cards',
			items: cards,
			logo: false,
			cols: 3,
			tags: ['#BusinessCards', '#PrintDesign', '#CardDesign', '#Branding', '#Stationery'],
		},
		{
			label: 'Stationery',
			items: stationery,
			logo: false,
			cols: 2,
			tags: ['#Letterhead', '#Stationery', '#OfficeDesign', '#CorporateIdentity', '#PrintReady'],
		},
		{
			label: 'Photography',
			items: photography,
			logo: false,
			cols: 2,
			tags: ['#ProductPhotography', '#JewelleryPhotography', '#ArtDirection', '#CommercialPhoto'],
		},
		{
			label: 'Wearables & Merch',
			items: wearables,
			logo: false,
			cols: 1,
			tags: ['#Wearables', '#MerchDesign', '#ApparelDesign', '#Branding', '#Lifestyle'],
		},
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

		{#each categories as cat, ci}
			<div class="cat-block cat-in" use:inview={{ delay: ci * 80 }}>

				<!-- Label -->
				<div class="cat-header">
					<span class="cat-name">{cat.label}</span>
					<span class="cat-count">{String(cat.items.length).padStart(2,'0')}</span>
				</div>

				<!-- Grid -->
				<div
					class="reveal-grid"
					class:logo-grid={cat.logo}
					style="--cols:{cat.cols}"
				>
					{#each cat.items as item, i}
						<div class="cell" class:logo={cat.logo} style="--i:{i}" use:inview={{ delay: i * 50 }}>
							<img src={item.src} alt={item.name} loading="lazy" />
							<div class="overlay">
								<span class="overlay-name">{item.name}</span>
							</div>
						</div>
					{/each}
				</div>

				<!-- Tags -->
				<div class="tags">
					{#each cat.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>

			</div>
		{/each}

	</div>
</section>

<style>
	section { padding: var(--section-pad) 0; }

	/* ── Header ─────────────────────────────── */
	.section-header { margin-bottom: 64px; }

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

	/* ── Category block ──────────────────────── */
	.cat-block { margin-bottom: 72px; }

	.cat-in {
		transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
	}
	.cat-in:global(.inview-ready) { opacity: 0; transform: translateY(36px); }
	.cat-in:global(.inview-ready.visible) { opacity: 1; transform: translateY(0); }

	.cat-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding-bottom: 14px;
		margin-bottom: 12px;
		border-bottom: 1px solid var(--color-border);
	}
	.cat-name {
		font-size: clamp(1rem, 2vw, 1.4rem);
		font-weight: 800;
		letter-spacing: -0.02em;
	}
	.cat-count {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		color: var(--color-accent);
	}

	/* ── Reveal grid ─────────────────────────── */
	.reveal-grid {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		gap: 4px;
		border-radius: 12px;
		overflow: hidden;
	}

	/* Logos: perfect squares, no fixed row height */
	.logo-grid .cell {
		aspect-ratio: 1 / 1;
	}

	/* Non-logo grids */
	.reveal-grid:not(.logo-grid) {
		grid-auto-rows: 260px;
	}
	/* Wide/single-column grids get taller rows */
	.reveal-grid[style*="--cols:1"],
	.reveal-grid[style*="--cols:2"] {
		grid-auto-rows: 360px;
	}

	/* ── Cell ────────────────────────────────── */
	.cell {
		position: relative;
		overflow: hidden;
		background: var(--color-surface);
		cursor: pointer;
		transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1);
	}
	.cell:global(.inview-ready) { opacity: 0; transform: scale(0.94); }
	.cell:global(.inview-ready.visible) { opacity: 1; transform: scale(1); }

	.cell img {
		width: 100%; height: 100%;
		object-fit: cover;
		display: block;
		filter: grayscale(1) brightness(0.28) blur(3px);
		transform: scale(1.08);
		transition: filter 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1);
	}
	/* Logos: contain + tight padding */
	.cell.logo img {
		object-fit: contain;
		padding: 6px;
	}

	.cell:hover img {
		filter: grayscale(0) brightness(1) blur(0px);
		transform: scale(1.04);
	}
	.cell.logo:hover img { transform: scale(1.05); }

	/* ── Overlay ─────────────────────────────── */
	.overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		padding: 14px 16px;
		background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%);
		opacity: 0;
		transition: opacity 0.35s ease;
	}
	.cell:hover .overlay { opacity: 1; }

	.overlay-name {
		font-size: 0.82rem;
		font-weight: 700;
		color: #fff;
		letter-spacing: -0.01em;
	}

	/* ── Tags ────────────────────────────────── */
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 14px;
	}
	.tag {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-text-dim);
		border: 1px solid var(--color-border);
		padding: 5px 13px;
		border-radius: 999px;
		letter-spacing: 0.01em;
		transition: color 0.25s ease, border-color 0.25s ease;
		cursor: default;
	}
	.tag:hover {
		color: var(--color-accent);
		border-color: rgba(168,85,247,0.4);
	}

	/* ── Mobile ──────────────────────────────── */
	@media (max-width: 640px) {
		.reveal-grid:not(.logo-grid) { grid-template-columns: repeat(2, 1fr) !important; }
		/* Logo grid stays 3-col — squares are small enough */
		.reveal-grid:not(.logo-grid) { grid-auto-rows: 180px; }
		/* Always reveal on mobile */
		.cell img { filter: grayscale(0) brightness(0.85) blur(0); transform: scale(1); }
		.overlay { opacity: 1; }
	}
</style>
