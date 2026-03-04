<script>
	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<section class="hero">
	<div class="hero-content" style="transform: translateY({scrollY * 0.3}px); opacity: {Math.max(0, 1 - scrollY / 600)}">
		<div class="hero-logo">
			<svg class="logo-icon" width="56" height="56" viewBox="161 -0.5 40.6 39.9" fill="currentColor">
				<path d="M174.44,33.06c-.26-.72.4-1.38.12-2.12-2.32-6.24,2.45-12.22,7.9-15.22,1.26-.69,3.45-1.25,4.49-1.96.63-.43,1.24-2.05,1.96-2.73.51-.48,1.49-1.06,2.16-1.27-.48-1.27-.08-2.85.58-4.02.56-.34,2.21,1.13,2.54,1.58.46.62.8,2.2.98,2.35.57.48,1.88.62,2.84,1.66,1.95,2.1,3.71,8.08-.81,8.19-.77.02-2.64-.65-3.06-.54-.37.1-1.83,1.49-1.88,1.86.41.64,1.15,1.02,1.64,1.63.94,1.15,2.31,4.19-.02,4.49-1.82.24-1.59-1.52-2.34-2.53-1.28-1.72-1.66-.08-2.15,1.15.37.79,1.14,1.17,1.56,1.99,1.29,2.52.07,5.4-.86,7.8.89.04,1.86-.22,2.55.47.56,1.44-.11,2.09-1.47,2.07-4.29-.04-12.38-.08-16.75-.08-9.59,0-13.8-10.92-11.21-20.25,1.2-4.31,5.66-9.27.49-12.8,2.08-1.69,4.7-3.11,7.38-3.57,8.87-1.5,11.96,6.11,7,13.35-1.49,2.17-3.61,3.97-4.66,6.48-1.39,3.29-5.35,8.68,1.02,12.02Z"/>
			</svg>
			<img class="logo-full" src="/images/logos/squirrel-logo.svg" alt="the Squirrel Media" />
		</div>

		<h1>
			We craft<br />
			<span class="accent">digital</span><br />
			experiences.
		</h1>

		<p class="hero-sub">Branding &middot; Web Design &middot; Digital Strategy</p>
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
