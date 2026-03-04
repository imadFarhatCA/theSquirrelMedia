<svelte:head>
	<title>Privacy Policy — the Squirrel Media</title>
	<meta name="description" content="Privacy Policy for the Squirrel Media. Learn how we collect, use, and protect your personal information." />
	<link rel="canonical" href="https://thesquirrelmedia.com/privacy-policy" />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<main class="legal-page">
	<div class="container">
		<a href="/" class="back-link">← Back to Home</a>

		<h1>Privacy Policy</h1>
		<p class="updated">Last updated: January 1, 2025</p>

		<section>
			<h2>1. Information We Collect</h2>
			<p>When you contact us through our website, we collect the information you provide, including your name, email address, phone number, and project details. We may also collect usage data such as browser type, pages visited, and time spent on the site.</p>
		</section>

		<section>
			<h2>2. How We Use Your Information</h2>
			<p>We use the information we collect to respond to your inquiries, provide our services, improve our website, and communicate with you about projects. We do not sell, trade, or rent your personal information to third parties.</p>
		</section>

		<section>
			<h2>3. Cookies</h2>
			<p>Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some functionality of the site.</p>
		</section>

		<section>
			<h2>4. Data Security</h2>
			<p>We take reasonable measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
		</section>

		<section>
			<h2>5. Third-Party Services</h2>
			<p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
		</section>

		<section>
			<h2>6. Your Rights</h2>
			<p>You have the right to access, correct, or delete your personal information that we hold. To exercise these rights, please contact us at <a href="mailto:hello@thesquirrelmedia.com">hello@thesquirrelmedia.com</a>.</p>
		</section>

		<section>
			<h2>7. Changes to This Policy</h2>
			<p>We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated date.</p>
		</section>

		<section>
			<h2>8. Contact Us</h2>
			<p>If you have questions about this Privacy Policy, please contact us:</p>
			<ul>
				<li>Email: <a href="mailto:hello@thesquirrelmedia.com">hello@thesquirrelmedia.com</a></li>
				<li>Phone: <a href="tel:+15142481548">+1 (514) 248 1548</a></li>
				<li>Address: Laval, QC, Canada</li>
			</ul>
		</section>
	</div>
</main>

<style>
	.legal-page {
		min-height: 100vh;
		padding: clamp(100px, 15vh, 160px) 0 80px;
		background: var(--color-bg);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--color-text-muted);
		text-decoration: none;
		font-size: 0.88rem;
		margin-bottom: 48px;
		transition: color 0.2s ease;
	}
	.back-link:hover { color: var(--color-accent); }

	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 800;
		color: var(--color-text);
		margin-bottom: 8px;
	}

	.updated {
		font-size: 0.82rem;
		color: var(--color-text-dim);
		margin-bottom: 56px;
	}

	section {
		margin-bottom: 40px;
		padding-bottom: 40px;
		border-bottom: 1px solid var(--color-border);
	}
	section:last-child {
		border-bottom: none;
	}

	h2 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 12px;
	}

	p, li {
		font-size: 0.95rem;
		line-height: 1.75;
		color: var(--color-text-dim);
	}

	ul {
		list-style: disc;
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	a {
		color: var(--color-accent);
		text-decoration: none;
	}
	a:hover { text-decoration: underline; }
</style>
