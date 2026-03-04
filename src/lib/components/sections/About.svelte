<script>
	import { inview } from '$lib/actions/inview.js';

	const services = [
		{ num: '01', title: 'Web Design & Development', desc: 'Custom websites built with modern frameworks, optimized for speed and conversion.' },
		{ num: '02', title: 'Brand Identity', desc: 'Logos, color systems, typography, and visual language that tell your story.' },
		{ num: '03', title: 'UI/UX Design', desc: 'User-centered interfaces that are intuitive, accessible, and delightful to use.' },
		{ num: '04', title: 'Digital Strategy', desc: 'SEO, analytics, and growth plans that turn visitors into customers.' },
		{ num: '05', title: 'Content Creation', desc: 'Photography, copywriting, and media production that elevates your brand.' }
	];
</script>

<section id="about">
	<div class="container about-grid">

		<div class="about-text">
			<span class="section-tag tag-in" use:inview>Who We Are</span>

			<h2 class="heading-in" use:inview>
				<span class="lw"><span class="lt">Creative studio</span></span>
				<span class="lw"><span class="lt">building brands</span></span>
				<span class="lw"><span class="lt">that <em class="accent">matter</em>.</span></span>
			</h2>

			<p class="para-in" use:inview={{ delay: 350 }}>
				We're a small team of designers and developers who believe great digital experiences
				start with understanding people. We partner with ambitious brands to create websites
				and identities that stand out, perform, and last.
			</p>
		</div>

		<div class="services-list">
			{#each services as svc, i}
				<div class="service-item" style="--i:{i}" use:inview>
					<span class="service-num">{svc.num}</span>
					<div class="service-body">
						<h4>{svc.title}</h4>
						<p>{svc.desc}</p>
					</div>
				</div>
			{/each}
		</div>

	</div>
</section>

<style>
	section { padding: var(--section-pad) 0; }

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

	/* Tag — only hidden after inview arms it */
	.tag-in:global(.inview-ready) {
		opacity: 0;
		transform: translateY(-18px) scale(0.88);
		transition: opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
		            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.tag-in:global(.inview-ready.visible) { opacity: 1; transform: translateY(0) scale(1); }

	/* Heading */
	h2 {
		font-size: clamp(2.2rem, 4vw, 3.8rem);
		margin-top: 22px;
		margin-bottom: 32px;
		display: flex;
		flex-direction: column;
	}
	.lw {
		display: block;
		overflow: hidden;
		padding-bottom: 0.06em;
	}
	.lt {
		display: block;
		transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.lw:nth-child(2) .lt { transition-delay: 0.1s; }
	.lw:nth-child(3) .lt { transition-delay: 0.2s; }

	.heading-in:global(.inview-ready) .lt {
		transform: translateY(115%) skewY(6deg);
		transform-origin: left bottom;
	}
	.heading-in:global(.inview-ready.visible) .lt { transform: translateY(0) skewY(0deg); }

	.accent { font-style: normal; color: var(--color-accent); }

	/* Paragraph */
	.para-in {
		font-size: 1rem;
		max-width: 480px;
		transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease;
	}
	.para-in:global(.inview-ready) {
		opacity: 0;
		transform: translateY(32px);
		filter: blur(6px);
	}
	.para-in:global(.inview-ready.visible) { opacity: 1; transform: translateY(0); filter: blur(0); }

	/* Services */
	.services-list { display: flex; flex-direction: column; }

	.service-item {
		position: relative;
		display: flex;
		gap: 24px;
		padding: 32px 0;
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
		            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Odd from left, even from right — extreme */
	.service-item:global(.inview-ready) {
		opacity: 0;
		transform: translateX(-340px) skewX(-10deg) scale(0.9);
	}
	.service-item:nth-child(even):global(.inview-ready) {
		transform: translateX(340px) skewX(10deg) scale(0.9);
	}
	.service-item:global(.inview-ready.visible),
	.service-item:nth-child(even):global(.inview-ready.visible) {
		opacity: 1;
		transform: translateX(0) skewX(0deg) scale(1);
	}

	/* Wipe line — drawn via ::before pseudo */
	.service-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: var(--color-border);
		transform-origin: left center;
		transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
	}

	.service-item:global(.inview-ready)::before {
		transform: scaleX(0);
	}
	.service-item:global(.inview-ready.visible)::before {
		transform: scaleX(1);
	}

	.service-num {
		font-size: 1.7rem;
		font-weight: 800;
		color: var(--color-accent);
		flex-shrink: 0;
		width: 52px;
		letter-spacing: -0.04em;
		line-height: 1;
	}

	.service-body {}

	.service-item h4 {
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		margin-bottom: 6px;
	}
	.service-item p { font-size: 0.88rem; line-height: 1.6; margin: 0; }

	/* Mobile */
	@media (max-width: 768px) {
		.about-grid { grid-template-columns: 1fr; gap: 48px; }
		.about-text { position: static; }
		h2 { font-size: clamp(2.4rem, 10vw, 3.2rem); }

		.service-item:global(.inview-ready) { transform: translateX(-200px) skewX(-8deg) scale(0.9); }
		.service-item:nth-child(even):global(.inview-ready) { transform: translateX(200px) skewX(8deg) scale(0.9); }
		.service-item:nth-child(even):global(.inview-ready.visible) { transform: translateX(0) skewX(0deg) scale(1); }
	}
</style>
