<script>
	import { inview } from '$lib/actions/inview.js';

	const services = [
		{ num: '01', title: 'Web Design & Development', desc: 'Custom websites built with modern frameworks, optimized for speed and conversion.', dir: 'left' },
		{ num: '02', title: 'Brand Identity', desc: 'Logos, color systems, typography, and visual language that tell your story.', dir: 'right' },
		{ num: '03', title: 'UI/UX Design', desc: 'User-centered interfaces that are intuitive, accessible, and delightful to use.', dir: 'left' },
		{ num: '04', title: 'Digital Strategy', desc: 'SEO, analytics, and growth plans that turn visitors into customers.', dir: 'right' },
		{ num: '05', title: 'Content Creation', desc: 'Photography, copywriting, and media production that elevates your brand.', dir: 'left' }
	];
</script>

<section id="about">
	<div class="container about-grid">
		<div class="about-text">
			<span class="section-tag fade-up" use:inview>Who We Are</span>
			<h2 class="fade-up" use:inview={{ delay: 80 }}>Creative studio<br />building brands<br />that <span class="accent">matter</span>.</h2>
			<p class="fade-up" use:inview={{ delay: 180 }}>
				We're a small team of designers and developers who believe great digital experiences
				start with understanding people. We partner with ambitious brands to create websites
				and identities that stand out, perform, and last.
			</p>
		</div>

		<div class="services-list">
			{#each services as svc, i}
				<div class="service-item" use:inview={{ threshold: 0.2 }}>
					<span class="service-num">{svc.num}</span>
					<div>
						<h4>{svc.title}</h4>
						<p>{svc.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		padding: var(--section-pad) 0;
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 80px;
		align-items: start;
	}

	.about-text {
		position: sticky;
		top: 120px;
	}

	h2 {
		font-size: clamp(2rem, 3.5vw, 3.5rem);
		margin-bottom: 24px;
	}

	.accent { color: var(--color-accent); }

	.about-text p {
		font-size: 1rem;
		max-width: 480px;
	}

	.services-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	/* desktop: slide left/right */
	.service-item {
		display: flex;
		gap: 20px;
		padding: 28px 0;
		opacity: 0;
		transform: translateX(-40px);
		transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
		            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.service-item:nth-child(even) {
		transform: translateX(40px);
	}
	.service-item.visible {
		opacity: 1;
		transform: translateX(0);
	}

	/* fade-up for about-text pieces */
	.fade-up {
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
		            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.fade-up.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.service-num {
		font-size: 1.6rem;
		font-weight: 800;
		color: var(--color-accent);
		flex-shrink: 0;
		width: 48px;
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.service-item h4 {
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		margin-bottom: 6px;
	}

	.service-item p {
		font-size: 0.88rem;
		line-height: 1.6;
		margin: 0;
	}

	@media (max-width: 768px) {
		.about-grid {
			grid-template-columns: 1fr;
			gap: 48px;
		}
		.about-text {
			position: static;
		}
		/* on mobile: all service items slide up instead of left/right */
		.service-item,
		.service-item:nth-child(even) {
			transform: translateY(40px);
		}
		.service-item.visible {
			transform: translateY(0);
		}
	}
</style>
