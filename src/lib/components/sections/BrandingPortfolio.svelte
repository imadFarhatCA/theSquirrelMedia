<script>
	import { inview } from '$lib/actions/inview.js';

	const mockups = [
		{ label: 'Business Card', span: 'tall', gradient: 'linear-gradient(135deg, #1a1a2e, #2d1b3d)' },
		{ label: 'Storefront Sign', span: 'wide', gradient: 'linear-gradient(135deg, #1b2838, #0f1923)' },
		{ label: 'Letterhead', span: 'tall', gradient: 'linear-gradient(135deg, #2a1f3d, #1a1528)' },
		{ label: 'Tote Bag', span: 'normal', gradient: 'linear-gradient(135deg, #1f2937, #111827)' },
		{ label: 'App Icon', span: 'normal', gradient: 'linear-gradient(135deg, #312e4a, #1e1b30)' },
		{ label: 'Social Media', span: 'wide', gradient: 'linear-gradient(135deg, #1a2332, #0d1520)' }
	];
</script>

<section id="branding">
	<div class="container">
		<div class="section-header reveal-left" use:inview>
			<span class="section-tag">Branding</span>
			<h2>Identity that<br /><span class="accent">speaks</span>.</h2>
			<p class="section-desc">From concept to execution, we build visual identities that resonate across every touchpoint.</p>
		</div>

		<div class="mockup-grid">
			{#each mockups as mockup, i}
				<div
					class="mockup-card {mockup.span} reveal-up"
					use:inview={{ delay: i * 80 }}
					style="background: {mockup.gradient}"
				>
					<div class="mockup-logo">
						<svg width="56" height="56" viewBox="161 -0.5 40.6 39.9" fill="currentColor" opacity="0.5">
							<path d="M174.44,33.06c-.26-.72.4-1.38.12-2.12-2.32-6.24,2.45-12.22,7.9-15.22,1.26-.69,3.45-1.25,4.49-1.96.63-.43,1.24-2.05,1.96-2.73.51-.48,1.49-1.06,2.16-1.27-.48-1.27-.08-2.85.58-4.02.56-.34,2.21,1.13,2.54,1.58.46.62.8,2.2.98,2.35.57.48,1.88.62,2.84,1.66,1.95,2.1,3.71,8.08-.81,8.19-.77.02-2.64-.65-3.06-.54-.37.1-1.83,1.49-1.88,1.86.41.64,1.15,1.02,1.64,1.63.94,1.15,2.31,4.19-.02,4.49-1.82.24-1.59-1.52-2.34-2.53-1.28-1.72-1.66-.08-2.15,1.15.37.79,1.14,1.17,1.56,1.99,1.29,2.52.07,5.4-.86,7.8.89.04,1.86-.22,2.55.47.56,1.44-.11,2.09-1.47,2.07-4.29-.04-12.38-.08-16.75-.08-9.59,0-13.8-10.92-11.21-20.25,1.2-4.31,5.66-9.27.49-12.8,2.08-1.69,4.7-3.11,7.38-3.57,8.87-1.5,11.96,6.11,7,13.35-1.49,2.17-3.61,3.97-4.66,6.48-1.39,3.29-5.35,8.68,1.02,12.02Z"/>
						</svg>
					</div>
					<span class="mockup-label">{mockup.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		padding: var(--section-pad) 0;
	}

	.section-header {
		margin-bottom: 60px;
	}

	h2 {
		font-size: clamp(2rem, 3.5vw, 3.5rem);
		margin-bottom: 16px;
	}

	.accent { color: var(--color-accent); }

	.section-desc {
		font-size: 1rem;
		max-width: 480px;
	}

	.mockup-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.mockup-card {
		position: relative;
		border-radius: 16px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 240px;
		cursor: pointer;
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
		            box-shadow 0.4s ease;
		border: 1px solid rgba(255,255,255,0.05);
	}

	.mockup-card:hover {
		transform: scale(1.03);
		box-shadow: 0 20px 60px rgba(168, 85, 247, 0.12);
	}

	.mockup-card.tall {
		grid-row: span 2;
		min-height: 496px;
	}

	.mockup-card.wide {
		grid-column: span 2;
	}

	.mockup-logo {
		color: var(--color-accent);
		transition: transform 0.4s ease, opacity 0.4s ease;
	}
	.mockup-card:hover .mockup-logo {
		transform: scale(1.1);
	}
	.mockup-card:hover .mockup-logo svg {
		opacity: 0.8;
	}

	.mockup-label {
		position: absolute;
		bottom: 16px;
		left: 20px;
		font-size: 0.75rem;
		font-weight: 600;
		color: rgba(255,255,255,0.35);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		transition: color 0.4s ease;
	}
	.mockup-card:hover .mockup-label {
		color: rgba(255,255,255,0.6);
	}

	@media (max-width: 768px) {
		.mockup-grid {
			grid-template-columns: 1fr 1fr;
		}
		.mockup-card.tall {
			grid-row: span 1;
			min-height: 200px;
		}
		.mockup-card.wide {
			grid-column: span 1;
		}
	}

	@media (max-width: 480px) {
		.mockup-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
