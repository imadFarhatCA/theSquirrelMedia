<script>
	let scrolled = $state(false);
	let menuOpen = $state(false);

	$effect(() => {
		const onScroll = () => scrolled = window.scrollY > 50;
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function scrollTo(id) {
		menuOpen = false;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<nav class:scrolled>
	<div class="nav-inner container">
		<button class="nav-toggle" class:open={menuOpen} onclick={() => menuOpen = !menuOpen} aria-label="Menu">
			<span></span><span></span><span></span>
		</button>

		<div class="nav-links">
			<button onclick={() => scrollTo('work')}><span>Work</span></button>
			<button onclick={() => scrollTo('branding')}><span>Branding</span></button>
			<button onclick={() => scrollTo('about')}><span>About</span></button>
			<button onclick={() => scrollTo('contact')}><span>Contact</span></button>
		</div>
	</div>
</nav>

<!-- Mobile overlay — outside <nav> to avoid backdrop-filter stacking context -->
<div class="mobile-overlay" class:open={menuOpen}>
	<button class="close-btn" onclick={() => menuOpen = false} aria-label="Close menu">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
		</svg>
	</button>
	<button onclick={() => scrollTo('work')}><span>Work</span></button>
	<button onclick={() => scrollTo('branding')}><span>Branding</span></button>
	<button onclick={() => scrollTo('about')}><span>About</span></button>
	<button onclick={() => scrollTo('contact')}><span>Contact</span></button>
</div>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 20px 0;
		transition: all 0.4s ease;
	}
	nav.scrolled {
		padding: 12px 0;
		background: rgba(10, 10, 10, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--color-border);
	}

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.nav-links {
		display: flex;
		gap: 8px;
	}
	.nav-links button:not(.close-btn) {
		position: relative;
		background: none;
		border: none;
		color: var(--color-text-muted);
		font-family: var(--font);
		font-size: 0.82rem;
		font-weight: 500;
		padding: 8px 16px;
		cursor: pointer;
		border-radius: 999px;
		overflow: hidden;
	}
	.nav-links button:not(.close-btn) span {
		display: inline-block;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
	}
	.nav-links button:not(.close-btn)::after {
		content: '';
		position: absolute;
		bottom: 4px;
		left: 50%;
		transform: translateX(-50%) scaleX(0);
		width: 30%;
		height: 0.5px;
		background: var(--color-text);
		border-radius: 1px;
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		transform-origin: center;
	}
	.nav-links button:not(.close-btn):hover span {
		transform: translateY(-2px);
		color: var(--color-text);
	}
	.nav-links button:not(.close-btn):hover::after {
		transform: translateX(-50%) scaleX(1);
	}

	.nav-toggle {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
	}
	.nav-toggle span {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--color-text);
		border-radius: 2px;
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
		            opacity 0.2s ease,
		            width 0.3s ease;
	}
	.nav-toggle.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
	.nav-toggle.open span:nth-child(2) { opacity: 0; width: 0; }
	.nav-toggle.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

	.mobile-overlay {
		display: none;
	}

	@media (max-width: 768px) {
		.nav-toggle { display: flex; }
		.nav-inner { justify-content: space-between; }
		.nav-links { display: none; }

		.mobile-overlay {
			display: flex;
			position: fixed;
			inset: 0;
			z-index: 200;
			background: rgba(10, 10, 10, 0.97);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 8px;
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.3s ease;
		}
		.mobile-overlay.open {
			opacity: 1;
			pointer-events: auto;
		}
		.mobile-overlay button:not(.close-btn) {
			background: none;
			border: none;
			color: var(--color-text-muted);
			font-family: var(--font);
			font-size: 1.5rem;
			font-weight: 700;
			padding: 16px 32px;
			cursor: pointer;
			transition: color 0.2s ease;
		}
		.mobile-overlay button:not(.close-btn):hover {
			color: var(--color-text);
		}
		.close-btn {
			position: absolute;
			top: 16px;
			right: 16px;
			width: 44px;
			height: 44px;
			border-radius: 50%;
			border: 1px solid rgba(255,255,255,0.15);
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			color: var(--color-text-muted);
			background: none;
			cursor: pointer;
			animation: popIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
			transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
		}
		.close-btn:hover {
			color: var(--color-text);
			border-color: rgba(255,255,255,0.4);
			background: rgba(255,255,255,0.08);
		}
		@keyframes popIn {
			from { opacity: 0; transform: scale(0.6) rotate(-90deg); }
			to   { opacity: 1; transform: scale(1) rotate(0deg); }
		}
	}
</style>
