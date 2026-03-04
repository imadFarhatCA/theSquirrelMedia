<script>
	const year = new Date().getFullYear();

	const services = [
		'Web Design',
		'Brand Identity',
		'UI/UX Design',
		'Digital Strategy',
		'Content Creation',
		'Hosting & Maintenance'
	];

	const industries = [
		'Insurance & Finance',
		'Food & Beverage',
		'Technology',
		'Healthcare',
		'Real Estate',
		'Retail & E-commerce',
		'Home & Renovation',
	];
</script>

<footer id="contact">
	<div class="container footer-grid">
		<div class="footer-col brand-col">
			<div class="footer-logo">
				<svg width="32" height="32" viewBox="161 -0.5 40.6 39.9" fill="currentColor">
					<path d="M174.44,33.06c-.26-.72.4-1.38.12-2.12-2.32-6.24,2.45-12.22,7.9-15.22,1.26-.69,3.45-1.25,4.49-1.96.63-.43,1.24-2.05,1.96-2.73.51-.48,1.49-1.06,2.16-1.27-.48-1.27-.08-2.85.58-4.02.56-.34,2.21,1.13,2.54,1.58.46.62.8,2.2.98,2.35.57.48,1.88.62,2.84,1.66,1.95,2.1,3.71,8.08-.81,8.19-.77.02-2.64-.65-3.06-.54-.37.1-1.83,1.49-1.88,1.86.41.64,1.15,1.02,1.64,1.63.94,1.15,2.31,4.19-.02,4.49-1.82.24-1.59-1.52-2.34-2.53-1.28-1.72-1.66-.08-2.15,1.15.37.79,1.14,1.17,1.56,1.99,1.29,2.52.07,5.4-.86,7.8.89.04,1.86-.22,2.55.47.56,1.44-.11,2.09-1.47,2.07-4.29-.04-12.38-.08-16.75-.08-9.59,0-13.8-10.92-11.21-20.25,1.2-4.31,5.66-9.27.49-12.8,2.08-1.69,4.7-3.11,7.38-3.57,8.87-1.5,11.96,6.11,7,13.35-1.49,2.17-3.61,3.97-4.66,6.48-1.39,3.29-5.35,8.68,1.02,12.02Z"/>
				</svg>
				<span class="footer-name">the Squirrel Media</span>
			</div>
			<p class="footer-tagline">
				Identity Conceptualization<br />
				Digital Branding<br />
				Design & Development
			</p>
		</div>

		<div class="footer-col">
			<h4>Services</h4>
			<ul>
				{#each services as s}
					<li><a href="#about">{s}</a></li>
				{/each}
			</ul>
		</div>

		<div class="footer-col">
			<h4>Industries We've Served</h4>
			<ul>
				{#each industries as ind}
					<li>{ind}</li>
				{/each}
			</ul>
		</div>

		<div class="footer-col">
			<h4>Get in Touch</h4>
			<ul class="contact-list">
				<li>
					<a href="mailto:hello@thesquirrelmedia.com">hello@thesquirrelmedia.com</a>
				</li>
				<li>
					<a href="tel:+15142481548">+1 (514) 248 1548</a>
				</li>
				<li>Laval - QC, Canada</li>
			</ul>

			<div class="socials">
				<!-- Instagram -->
				<a href="#" aria-label="Instagram">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
				</a>
				<!-- Facebook -->
				<a href="#" aria-label="Facebook">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
				</a>
				<!-- Dribbble -->
				<a href="#" aria-label="Dribbble">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6.03 12.24 7.15 18.5"/></svg>
				</a>
				<!-- LinkedIn -->
				<a href="#" aria-label="LinkedIn">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
				</a>
			</div>
		</div>
	</div>

	<div class="footer-bottom container">
		<span>&copy; {year} the Squirrel Media. All rights reserved.</span>
		<div class="footer-legal">
			<a href="/privacy-policy">Privacy Policy</a>
			<span class="sep">·</span>
			<a href="/terms">Terms & Conditions</a>
		</div>
	</div>
</footer>

<style>
	footer {
		background: var(--color-surface);
		border-top: 1px solid var(--color-border);
		padding: 80px 0 0;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
		gap: 48px;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--color-accent);
		margin-bottom: 16px;
	}

	.footer-name {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--color-text);
	}

	.footer-tagline {
		font-size: 0.82rem;
		line-height: 1.7;
		color: var(--color-text-dim);
	}

	h4 {
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-bottom: 20px;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	ul li, ul li a {
		font-size: 0.88rem;
		color: var(--color-text-dim);
		transition: color var(--ease);
	}
	ul li a:hover {
		color: var(--color-accent);
	}

	.socials {
		display: flex;
		gap: 12px;
		margin-top: 24px;
	}
	.socials a {
		color: var(--color-text-dim);
		padding: 8px;
		border-radius: 8px;
		border: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--ease);
	}
	.socials a:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
		background: var(--color-accent-glow);
	}

	.footer-bottom {
		margin-top: 48px;
		padding: 20px 0;
		border-top: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
	}
	.footer-bottom span {
		font-size: 0.78rem;
		color: var(--color-text-dim);
	}
	.footer-legal {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.footer-legal a {
		font-size: 0.78rem;
		color: var(--color-text-dim);
		transition: color 0.2s ease;
	}
	.footer-legal a:hover { color: var(--color-accent); }
	.footer-legal .sep {
		font-size: 0.78rem;
		color: var(--color-text-dim);
	}

	@media (max-width: 768px) {
		.footer-grid {
			grid-template-columns: 1fr 1fr;
			gap: 40px;
		}
	}

	@media (max-width: 480px) {
		.footer-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
