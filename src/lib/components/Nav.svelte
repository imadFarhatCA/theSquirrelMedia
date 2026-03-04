<script>
	import { modalOpen } from '$lib/stores/ui.js';

	let scrolled = $state(false);
	let menuOpen = $state(false);

	$effect(() => {
		const onScroll = () => scrolled = window.scrollY > 50;
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function scrollTo(e, id) {
		e.preventDefault();
		menuOpen = false;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	function openModal() {
		menuOpen = false;
		$modalOpen = true;
	}
</script>

<nav class:scrolled>
	<div class="nav-inner container">
		<button class="nav-toggle" class:open={menuOpen} onclick={() => menuOpen = !menuOpen} aria-label="Menu">
			<span></span><span></span><span></span>
		</button>

		<div class="nav-links">
			<a href="#work" onclick={(e) => scrollTo(e, 'work')}><span>Digital</span></a>
			<a href="#branding" onclick={(e) => scrollTo(e, 'branding')}><span>Branding</span></a>
			<a href="#about" onclick={(e) => scrollTo(e, 'about')}><span>About</span></a>
			<a href="#contact" onclick={(e) => scrollTo(e, 'contact')}><span>Contact</span></a>
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

	<div class="overlay-center">
		<div class="overlay-nav">
			<a href="#work" onclick={(e) => scrollTo(e, 'work')}><span>Digital</span></a>
			<a href="#branding" onclick={(e) => scrollTo(e, 'branding')}><span>Branding</span></a>
			<a href="#about" onclick={(e) => scrollTo(e, 'about')}><span>About</span></a>
			<a href="#contact" onclick={(e) => scrollTo(e, 'contact')}><span>Contact</span></a>
		</div>

		<button class="overlay-cta" onclick={openModal}>
			Let us Collaborate
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
				<path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>

	<div class="overlay-bottom">
		<div class="overlay-contact">
			<a href="mailto:hello@thesquirrelmedia.com">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
					<path d="M2 7l10 7 10-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
				hello@thesquirrelmedia.com
			</a>
			<a href="tel:+15142481548">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				+1 (514) 248 1548
			</a>
		</div>

		<div class="overlay-socials">
			<a href="https://instagram.com/thesquirrelmedia" target="_blank" rel="noopener" aria-label="Instagram">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
					<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
					<circle cx="12" cy="12" r="5"/>
					<circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
				</svg>
			</a>
			<a href="https://facebook.com/thesquirrelmedia" target="_blank" rel="noopener" aria-label="Facebook">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
					<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
				</svg>
			</a>
			<a href="https://dribbble.com/thesquirrelmedia" target="_blank" rel="noopener" aria-label="Dribbble">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"/>
					<path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/>
					<path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/>
					<path d="M8.56 2.75c4.37 6 6.03 12.24 7.15 18.5"/>
				</svg>
			</a>
			<a href="https://linkedin.com/company/thesquirrelmedia" target="_blank" rel="noopener" aria-label="LinkedIn">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
					<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
					<rect width="4" height="12" x="2" y="9"/>
					<circle cx="4" cy="4" r="2"/>
				</svg>
			</a>
		</div>
	</div>
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
	.nav-links a {
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
		text-decoration: none;
	}
	.nav-links a span {
		display: inline-block;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
	}
	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: 4px;
		left: 50%;
		transform: translateX(-50%) scaleX(0);
		width: 30%;
		height: 0.5px;
		background: var(--color-accent);
		border-radius: 1px;
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		transform-origin: center;
	}
	.nav-links a:hover span {
		transform: translateY(-2px);
		color: var(--color-accent);
	}
	.nav-links a:hover::after {
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
			padding: 80px 32px 48px;
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.3s ease;
		}
		.mobile-overlay.open {
			opacity: 1;
			pointer-events: auto;
		}

		.overlay-center {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 28px;
		}

		.overlay-nav {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 4px;
		}
		.overlay-nav a {
			background: none;
			border: none;
			color: var(--color-text-muted);
			font-family: var(--font);
			font-size: 1.5rem;
			font-weight: 700;
			padding: 14px 32px;
			cursor: pointer;
			transition: color 0.2s ease;
			text-decoration: none;
		}
		.overlay-nav a:hover {
			color: var(--color-accent);
		}

		.overlay-bottom {
			position: absolute;
			bottom: 48px;
			left: 0;
			right: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20px;
		}

		.overlay-contact {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10px;
		}
		.overlay-contact a {
			display: flex;
			align-items: center;
			gap: 8px;
			color: var(--color-text-muted);
			text-decoration: none;
			font-size: 0.9rem;
			transition: color 0.2s ease;
		}
		.overlay-contact a:hover {
			color: var(--color-text);
		}

		.overlay-socials {
			display: flex;
			gap: 20px;
		}
		.overlay-socials a {
			color: var(--color-text-dim);
			text-decoration: none;
			transition: color 0.2s ease;
		}
		.overlay-socials a:hover {
			color: var(--color-accent);
		}

		.overlay-cta {
			display: inline-flex;
			align-items: center;
			gap: 10px;
			padding: 16px 36px;
			border: 1.5px solid rgba(168, 85, 247, 0.45);
			border-radius: 999px;
			color: var(--color-accent);
			font-family: var(--font);
			font-size: 1rem;
			font-weight: 700;
			cursor: pointer;
			background: rgba(168, 85, 247, 0.06);
			transition: all 0.3s ease;
		}
		.overlay-cta:hover {
			background: var(--color-accent);
			border-color: var(--color-accent);
			color: #fff;
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
