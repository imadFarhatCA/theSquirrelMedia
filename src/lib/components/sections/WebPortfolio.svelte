<script>
	import { inview } from '$lib/actions/inview.js';
	import DeviceMockup from './DeviceMockup.svelte';
	import { portfolioProjects } from '$lib/data/portfolio.js';

	let active = $state(0);
	let cardWidth = $state(620);
	const gap = 32;
	const total = portfolioProjects.length;

	let offset = $derived(active * (cardWidth + gap));

	function prev() { if (active > 0) active--; }
	function next() { if (active < total - 1) active++; }

	function measureCards(el) {
		const measure = () => {
			const first = el?.querySelector('.card');
			if (first) cardWidth = first.offsetWidth;
		};
		measure();
		window.addEventListener('resize', measure);
		return { destroy: () => window.removeEventListener('resize', measure) };
	}
</script>

<section id="work">
	<div class="portfolio-layout">
		<!-- Left: project info -->
		<div class="portfolio-info reveal-left" use:inview>
			<span class="section-tag">Our Work</span>
			<h2>Websites we've<br /><span class="accent">crafted</span>.</h2>

			<div class="project-details">
				{#each portfolioProjects as project, i}
					<div class="project-text" class:active={i === active}>
						<span class="project-num">{String(i + 1).padStart(2, '0')}</span>
						<h3>{project.name}</h3>
						<p class="project-aka">{project.aka}</p>
						<p class="project-desc">{project.description}</p>
						<div class="tech-pills">
							{#each project.tech as t}
								<span class="pill">{t}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<div class="nav-controls">
				<button class="nav-btn" onclick={prev} disabled={active === 0} aria-label="Previous project">
					<svg width="26" height="26" viewBox="0 0 20 20" fill="none">
						<path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<span class="nav-count">{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
				<button class="nav-btn" onclick={next} disabled={active === total - 1} aria-label="Next project">
					<svg width="26" height="26" viewBox="0 0 20 20" fill="none">
						<path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Right: cards -->
		<div class="cards-area reveal-right" use:inview>
			<div class="card-viewport">
				<div class="card-track" use:measureCards style="transform: translateX(-{offset}px)">
					{#each portfolioProjects as project, i}
						<div class="card" class:active={i === active}>
							<DeviceMockup
								desktopImage={project.desktopImage}
								mobileImage={project.mobileImage}
								color={project.color}
								scrollDuration={18 + i * 3}
							/>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		padding: var(--section-pad) 0;
		overflow: hidden;
	}

	.portfolio-layout {
		display: grid;
		grid-template-columns: minmax(320px, 30vw) 1fr;
		gap: 48px;
		align-items: start;
		min-height: 480px;
		padding-left: max(5%, calc((100vw - 1400px) / 2));
	}

	/* ── Left: Info ────────────────────────── */
	.portfolio-info {
		padding-right: 16px;
		position: sticky;
		top: 120px;
		align-self: start;
	}

	h2 {
		font-size: clamp(2rem, 3.5vw, 3rem);
		margin-bottom: 32px;
	}

	.accent { color: var(--color-accent); }

	.project-details {
		position: relative;
		min-height: 240px;
	}

	.project-text {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		opacity: 0;
		transform: translateY(12px);
		transition: opacity 0.4s ease, transform 0.4s ease;
		pointer-events: none;
	}
	.project-text.active {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
		position: relative;
	}

	.project-num {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--color-accent);
		letter-spacing: 0.1em;
		display: block;
		margin-bottom: 12px;
	}

	.project-text h3 {
		font-size: clamp(1.6rem, 2.2vw, 2.2rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		margin-bottom: 4px;
	}

	.project-aka {
		font-size: 0.85rem;
		color: var(--color-text-dim);
		font-style: italic;
		margin-bottom: 14px;
	}

	.project-desc {
		font-size: 0.9rem;
		line-height: 1.7;
		margin-bottom: 18px;
	}

	.tech-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.pill {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-text-muted);
		border: 1px solid var(--color-border);
		padding: 5px 14px;
		border-radius: 999px;
		letter-spacing: 0.02em;
	}

	/* ── Nav controls (below pills) ──────── */
	.nav-controls {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-top: 32px;
	}

	/* ── Right: Cards area ─────────────────── */
	.cards-area {
		display: flex;
		flex-direction: column;
		padding-left: 60px;
		padding-top: 80px;
		min-width: 0;
	}

	.nav-btn {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.25s ease;
	}
	.nav-btn:hover:not(:disabled) {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: #fff;
	}
	.nav-btn:disabled {
		opacity: 0.25;
		cursor: default;
	}

	.nav-count {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-text-muted);
		letter-spacing: 0.08em;
		font-variant-numeric: tabular-nums;
	}

	/* ── Card viewport + track ─────────────── */
	.card-viewport {
		overflow: hidden;
	}

	.card-track {
		display: flex;
		gap: 32px;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		padding: 10px 0 40px;
	}

	.card {
		flex: 0 0 min(744px, 72vw);
		opacity: 0.4;
		transform: scale(0.96);
		transition: opacity 0.4s ease, transform 0.4s ease;
	}
	.card.active {
		opacity: 1;
		transform: scale(1);
	}

	/* ── Responsive ────────────────────────── */
	@media (max-width: 900px) {
		.portfolio-layout {
			grid-template-columns: 1fr;
			gap: 32px;
			padding-left: 0;
		}

		.portfolio-info {
			position: static;
			padding-left: 5%;
			padding-right: 5%;
		}

		.project-details {
			min-height: 200px;
		}

		.cards-area {
			padding-left: 0;
			padding-top: 0;
			overflow: hidden;
		}

		.card-track {
			padding-left: 5%;
		}

		.card {
			flex: 0 0 90vw;
			opacity: 0;
			transform: none;
		}

		.card.active {
			opacity: 1;
			transform: none;
		}
	}
</style>
