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
				<img src="/images/logos/squirrel-logo.svg" alt="the Squirrel Media" class="footer-logo-img" />
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
		margin-bottom: 16px;
	}

	.footer-logo-img {
		height: 40px;
		width: auto;
		opacity: 0.9;
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
