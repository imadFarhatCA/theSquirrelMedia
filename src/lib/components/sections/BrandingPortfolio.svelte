<script>
	import { inview } from '$lib/actions/inview.js';

	// gc = grid-column, gr = grid-row
	const logos = [
		{ src: '/portfolioSamples/brandIdentity/LAM%20-%20Lydia%20Tanios%20earthycolor.jpg',   alt: 'LAM — Lydia Tanios',           gc: '1',          gr: '1' },
		{ src: '/portfolioSamples/brandIdentity/Semolina%20LogoBranding.jpg',                   alt: 'Semolina',                     gc: '2 / span 2', gr: '1' },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%201.jpg',                          alt: 'Siralloc',                     gc: '1',          gr: '2 / span 2' },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%202.jpg',                          alt: 'Siralloc',                     gc: '2',          gr: '2' },
		{ src: '/portfolioSamples/brandIdentity/el-Hage%20Assurances%20newLogo.jpg',            alt: 'el-Hage Assurances',           gc: '3',          gr: '2' },
		{ src: '/portfolioSamples/brandIdentity/it%20is%20Thyme%20-%20logo.jpg',                alt: 'it is Thyme',                  gc: '2 / span 2', gr: '3' },
		{ src: '/portfolioSamples/brandIdentity/majdalani-logo.jpg',                            alt: 'Majdalani',                    gc: '1',          gr: '4' },
		{ src: '/portfolioSamples/brandIdentity/oceanFrontier%20consultingLogo.jpg',            alt: 'Ocean Frontier Consulting',    gc: '2',          gr: '4' },
		{ src: '/portfolioSamples/brandIdentity/troikaInsurance%20logo.svg',                    alt: 'Troika Insurance',             gc: '3',          gr: '4' },
	];

	const cards = [
		{ src: '/portfolioSamples/businessCards/equipeFares%20businessCard%20simulation%20002.jpg', alt: 'Equipe Farès Business Card' },
		{ src: '/portfolioSamples/businessCards/majdalani%20MembershipCards%20simulation.jpg',      alt: 'Majdalani Membership Cards' },
		{ src: '/portfolioSamples/businessCards/troika%20businessCard.jpg',                          alt: 'Troika Insurance Business Card' },
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

		<!-- Logos masonry grid -->
		<div class="block-label cat-in" use:inview>Logo Design <span class="count">09</span></div>
		<div class="logos-grid cat-in" use:inview>
			{#each logos as logo, i}
				<div
					class="logo-cell"
					style="grid-column:{logo.gc}; grid-row:{logo.gr}; --i:{i}"
					use:inview={{ delay: i * 55 }}
				>
					<img src={logo.src} alt={logo.alt} loading="lazy" />
				</div>
			{/each}
		</div>

		<!-- Business Cards -->
		<div class="block-label cat-in" use:inview style="margin-top: 64px">Business Cards <span class="count">03</span></div>
		<div class="cards-grid cat-in" use:inview>
			{#each cards as card, i}
				<div class="card-cell" style="--i:{i}" use:inview={{ delay: i * 80 }}>
					<img src={card.src} alt={card.alt} loading="lazy" />
				</div>
			{/each}
		</div>

		<!-- Letterhead -->
		<div class="block-label cat-in" use:inview style="margin-top: 64px">Stationery <span class="count">01</span></div>
		<div class="letterhead cat-in" use:inview>
			<img src="/portfolioSamples/letterHead/equipeFares%20envelop%20simulation.jpg" alt="Equipe Farès Envelope & Letterhead" loading="lazy" />
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

	/* ── Block labels ────────────────────────── */
	.block-label {
		display: flex;
		align-items: baseline;
		gap: 12px;
		font-size: clamp(1.1rem, 2vw, 1.5rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--color-text);
		padding-bottom: 16px;
		margin-bottom: 16px;
		border-bottom: 1px solid var(--color-border);
	}
	.count {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		color: var(--color-accent);
	}

	.cat-in {
		transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
	}
	.cat-in:global(.inview-ready) { opacity: 0; transform: translateY(40px); }
	.cat-in:global(.inview-ready.visible) { opacity: 1; transform: translateY(0); }

	/* ── Logos masonry ───────────────────────── */
	.logos-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: 200px;
		gap: 4px;
	}

	.logo-cell {
		background: var(--color-surface);
		overflow: hidden;
		cursor: pointer;
		position: relative;
		transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
	}
	.logo-cell:hover { transform: scale(1.03); z-index: 2; }

	/* Rounded corners on the four corners of the whole grid */
	.logo-cell:first-child                          { border-radius: 12px 0 0 0; }
	.logo-cell:nth-child(2)                         { border-radius: 0 12px 0 0; }
	.logo-cell[style*="grid-row:1 / span 2"]        { border-radius: 12px 0 0 0; }
	.logo-cell:nth-child(7)                         { border-radius: 0 0 0 12px; }
	.logo-cell:last-child                           { border-radius: 0 0 12px 0; }

	.logo-cell img {
		width: 100%; height: 100%;
		object-fit: contain;
		padding: 20px;
		display: block;
		transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
	}
	.logo-cell:hover img { transform: scale(1.08); }

	/* ── Business cards ──────────────────────── */
	.cards-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}

	.card-cell {
		border-radius: 12px;
		overflow: hidden;
		background: var(--color-surface);
		cursor: pointer;
		aspect-ratio: 16/10;
		transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
	}
	.card-cell:hover {
		transform: scale(1.03) translateY(-5px);
		box-shadow: 0 24px 60px rgba(0,0,0,0.5);
	}
	.card-cell img {
		width: 100%; height: 100%;
		object-fit: cover; display: block;
		transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
	}
	.card-cell:hover img { transform: scale(1.05); }

	/* ── Letterhead ──────────────────────────── */
	.letterhead {
		border-radius: 16px;
		overflow: hidden;
		background: var(--color-surface);
		cursor: pointer;
		transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
	}
	.letterhead:hover {
		transform: scale(1.01) translateY(-4px);
		box-shadow: 0 32px 80px rgba(0,0,0,0.5);
	}
	.letterhead img {
		width: 100%; height: auto;
		display: block;
		transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
	}
	.letterhead:hover img { transform: scale(1.03); }

	/* ── Mobile ──────────────────────────────── */
	@media (max-width: 768px) {
		.logos-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 160px;
		}
		/* Reset all explicit positions — let grid auto-place on mobile */
		.logo-cell {
			grid-column: auto !important;
			grid-row: auto !important;
		}
		.logo-cell:first-child                    { border-radius: 12px 0 0 0; }
		.logo-cell:nth-child(2)                   { border-radius: 0 12px 0 0; }
		.logo-cell:nth-child(7)                   { border-radius: 0 0 0 12px; }
		.logo-cell:nth-child(8)                   { border-radius: 0 0 12px 0; }
		.logo-cell:last-child:nth-child(odd)      { grid-column: 1 / span 2 !important; border-radius: 0 0 12px 12px; }

		.cards-grid { grid-template-columns: 1fr; }
	}
</style>
