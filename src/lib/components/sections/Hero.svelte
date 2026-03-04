<script>
	import { modalOpen } from '$lib/stores/ui.js';
	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<section class="hero">
	<div class="hero-content" style="transform: translateY({scrollY * 0.3}px); opacity: {Math.max(0, 1 - scrollY / 600)}">
		<div class="hero-logo">
			<div class="hover-hint" aria-hidden="true">
				<svg width="20" height="20" viewBox="0 0 14 14" fill="none">
					<path d="M7 13V3M3 9l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<svg class="logo-icon" width="56" height="56" viewBox="0 0 56 56" fill="currentColor">
				<!-- Stem -->
				<rect x="29" y="4" width="4.5" height="11" rx="2.25" transform="rotate(-8 31 4)"/>
				<!-- Cap dome -->
				<path d="M6 24 C6 13 50 13 50 24 L48 29 L8 29 Z"/>
				<!-- Cap rim -->
				<rect x="6" y="27" width="44" height="5.5" rx="2.75"/>
				<!-- Body -->
				<path d="M12 32 Q8 36 8 43 Q8 56 28 56 Q48 56 48 43 Q48 36 44 32 Z"/>
			</svg>
			<img class="logo-full" src="/images/logos/squirrel-logo.svg" alt="the Squirrel Media" />
		</div>

		<h1>
			We craft<br />
			<span class="accent">digital</span><br />
			experiences.
		</h1>

		<p class="hero-sub">Branding &middot; Web Design &middot; Digital Strategy</p>

		<button class="cta-collab" onclick={() => $modalOpen = true}>
			Let us Collaborate
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
				<path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>

	<div class="scroll-indicator" style="opacity: {Math.max(0, 1 - scrollY / 300)}">
		<div class="scroll-line"></div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse 90% 45% at 50% 40%, rgba(168, 85, 247, 0.18) 0%, transparent 100%),
			radial-gradient(ellipse 65% 38% at 60% 34%, rgba(120, 50, 220, 0.1) 0%, transparent 100%);
		pointer-events: none;
	}


	.hero-content {
		position: relative;
		text-align: center;
		padding: 0 5%;
	}

	.hero-logo {
		margin-bottom: 48px;
		animation: fadeDown 1s ease 0.2s both;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		position: relative;
		height: 56px;
	}

	.hover-hint {
		position: absolute;
		top: -44px;
		left: 50%;
		transform: translateX(-50%);
		color: var(--color-text-dim);
		animation: hintBounce 1.2s ease-in-out infinite;
		pointer-events: none;
	}
	.hero-logo:hover .hover-hint {
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	@keyframes hintBounce {
		0%, 100% { transform: translateX(-50%) translateY(0); }
		50%       { transform: translateX(-50%) translateY(5px); }
	}
.logo-icon {
		color: var(--color-text);
		opacity: 0.8;
		flex-shrink: 0;
		animation: iconFloat 4s ease-in-out 2s infinite;
		transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.hero-logo:hover .logo-icon {
		opacity: 0;
		transform: scale(0.5);
		animation: none;
	}

	@keyframes iconFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-8px); }
	}

	.logo-full {
		height: 48px;
		width: auto;
		position: absolute;
		filter: brightness(1.15);
		opacity: 0;
		clip-path: circle(0% at 50% 50%);
		transition: clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s,
		            opacity 0.3s ease;
	}
	.hero-logo:hover .logo-full {
		opacity: 0.85;
		clip-path: circle(100% at 50% 50%);
	}

	h1 {
		font-size: clamp(3.2rem, 9vw, 9rem);
		font-weight: 900;
		line-height: 0.95;
		letter-spacing: -0.04em;
		animation: fadeUp 1s ease 0.4s both;
	}

	.accent {
		color: var(--color-accent);
		font-style: italic;
	}

	.hero-sub {
		font-size: clamp(0.9rem, 1.5vw, 1.15rem);
		font-weight: 400;
		color: var(--color-text-dim);
		margin-top: 32px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		animation: fadeUp 1s ease 0.7s both;
	}

	.cta-collab {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 14px 32px;
		border: 1.5px solid rgba(168, 85, 247, 0.45);
		border-radius: 999px;
		color: var(--color-accent);
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		cursor: pointer;
		background: rgba(168, 85, 247, 0.06);
		backdrop-filter: blur(8px);
		transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		margin-top: 48px;
		animation: fadeUp 1s ease 1s both;
	}
	.cta-collab:hover {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: #fff;
		transform: scale(1.05);
		box-shadow: 0 0 40px rgba(168, 85, 247, 0.35);
	}
	.cta-collab svg {
		transition: transform 0.3s ease;
	}
	.cta-collab:hover svg {
		transform: translate(2px, -2px);
	}

	.scroll-indicator {
		position: absolute;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.scroll-line {
		width: 1px;
		height: 48px;
		background: linear-gradient(to bottom, var(--color-accent), transparent);
		animation: scrollPulse 2s ease-in-out infinite;
	}

	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(30px); }
		to { opacity: 1; transform: translateY(0); }
	}
	@keyframes fadeDown {
		from { opacity: 0; transform: translateY(-20px); }
		to { opacity: 1; transform: translateY(0); }
	}
	@keyframes scrollPulse {
		0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
		50% { opacity: 1; transform: scaleY(1); }
	}
</style>
