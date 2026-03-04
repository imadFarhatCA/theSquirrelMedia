<script>
	import { inview } from '$lib/actions/inview.js';
	import { fade } from 'svelte/transition';

	const pieces = [
		{ src: '/portfolioSamples/brandIdentity/LAM%20-%20Lydia%20Tanios%20earthycolor.jpg',             name: 'LAM — Lydia Tanios',            cat: 'Logo',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/Semolina%20LogoBranding.jpg',                             name: 'Semolina',                      cat: 'Logo',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%201.jpg',                                    name: 'Siralloc',                      cat: 'Logo',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/SirallocLogo%202.jpg',                                    name: 'Siralloc',                      cat: 'Logo',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/el-Hage%20Assurances%20newLogo.jpg',                      name: 'el-Hage Assurances',            cat: 'Logo',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/it%20is%20Thyme%20-%20logo.jpg',                          name: 'it is Thyme',                   cat: 'Logo',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/majdalani-logo.jpg',                                      name: 'Majdalani',                     cat: 'Logo',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/oceanFrontier%20consultingLogo.jpg',                      name: 'Ocean Frontier Consulting',     cat: 'Logo',          logo: true  },
		{ src: '/portfolioSamples/brandIdentity/troikaInsurance%20logo.svg',                              name: 'Troika Insurance',              cat: 'Logo',          logo: true  },
		{ src: '/portfolioSamples/businessCards/equipeFares%20businessCard%20simulation%20002.jpg',        name: 'Equipe Farès',                  cat: 'Business Card', logo: false },
		{ src: '/portfolioSamples/businessCards/majdalani%20MembershipCards%20simulation.jpg',             name: 'Majdalani',                     cat: 'Business Card', logo: false },
		{ src: '/portfolioSamples/businessCards/troika%20businessCard.jpg',                                name: 'Troika Insurance',              cat: 'Business Card', logo: false },
		{ src: '/portfolioSamples/letterHead/equipeFares%20envelop%20simulation.jpg',                     name: 'Equipe Farès',                  cat: 'Stationery',    logo: false },
	];

	let active = $state(0);
	let filmstrip;

	function select(i) {
		active = i;
		// scroll the active thumb into view
		const el = filmstrip?.children[i];
		el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
	}
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

		<!-- Spotlight -->
		<div class="spotlight reveal" use:inview>
			<div class="spotlight-img" class:logo={pieces[active].logo}>
				{#key active}
					<img
						src={pieces[active].src}
						alt={pieces[active].name}
						in:fade={{ duration: 300 }}
					/>
				{/key}
			</div>

			<div class="spotlight-meta">
				{#key active}
					<span class="meta-cat" in:fade={{ duration: 250, delay: 60 }}>{pieces[active].cat}</span>
					<span class="meta-name" in:fade={{ duration: 250, delay: 100 }}>{pieces[active].name}</span>
				{/key}
				<span class="meta-count">{String(active + 1).padStart(2,'0')} / {String(pieces.length).padStart(2,'0')}</span>
			</div>
		</div>

		<!-- Filmstrip -->
		<div class="filmstrip-wrap reveal" use:inview={{ delay: 200 }}>
			<div class="filmstrip" bind:this={filmstrip}>
				{#each pieces as piece, i}
					<button
						class="thumb"
						class:active={i === active}
						class:logo={piece.logo}
						onclick={() => select(i)}
						aria-label={piece.name}
					>
						<img src={piece.src} alt={piece.name} loading="lazy" />
					</button>
				{/each}
			</div>
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

	/* ── Spotlight ───────────────────────────── */
	.spotlight {
		border-radius: 20px;
		overflow: hidden;
		background: var(--color-surface);
		margin-bottom: 12px;
		position: relative;
	}

	.spotlight-img {
		width: 100%;
		height: clamp(320px, 52vw, 640px);
		overflow: hidden;
		position: relative;
	}
	.spotlight-img img {
		position: absolute;
		inset: 0;
		width: 100%; height: 100%;
		object-fit: cover;
		display: block;
	}
	.spotlight-img.logo img {
		object-fit: contain;
		padding: 48px;
	}

	.spotlight-meta {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 20px 28px;
		border-top: 1px solid var(--color-border);
	}
	.meta-cat {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--color-accent);
		background: rgba(168,85,247,0.1);
		border: 1px solid rgba(168,85,247,0.25);
		padding: 4px 12px;
		border-radius: 999px;
	}
	.meta-name {
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--color-text);
		flex: 1;
	}
	.meta-count {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-text-dim);
		letter-spacing: 0.06em;
		font-variant-numeric: tabular-nums;
	}

	/* ── Filmstrip ───────────────────────────── */
	.filmstrip-wrap {
		overflow-x: auto;
		scrollbar-width: none;
	}
	.filmstrip-wrap::-webkit-scrollbar { display: none; }

	.filmstrip {
		display: flex;
		gap: 8px;
		padding-bottom: 4px;
	}

	.thumb {
		flex: 0 0 100px;
		height: 72px;
		border-radius: 10px;
		overflow: hidden;
		background: var(--color-surface);
		border: 2px solid transparent;
		cursor: pointer;
		padding: 0;
		transition: border-color 0.25s ease, transform 0.25s ease, opacity 0.25s ease;
		opacity: 0.45;
	}
	.thumb:hover { opacity: 0.75; transform: translateY(-2px); }
	.thumb.active {
		border-color: var(--color-accent);
		opacity: 1;
		transform: translateY(-3px);
	}
	.thumb img {
		width: 100%; height: 100%;
		object-fit: cover;
		display: block;
		pointer-events: none;
	}
	.thumb.logo img {
		object-fit: contain;
		padding: 8px;
	}

	/* ── Mobile ──────────────────────────────── */
	@media (max-width: 640px) {
		.spotlight-img { height: 56vw; }
		.spotlight-meta { padding: 14px 18px; gap: 10px; }
		.thumb { flex: 0 0 76px; height: 56px; }
	}
</style>
