<svelte:head>
	<title>Terms & Conditions — the Squirrel Media</title>
	<meta name="description" content="Terms and Conditions for the Squirrel Media. Read about our service agreements, intellectual property rights, and usage terms." />
	<link rel="canonical" href="https://thesquirrelmedia.pages.dev/terms" />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<main class="legal-page">
	<div class="container">
		<a href="/" class="back-link">← Back to Home</a>

		<h1>Terms & Conditions</h1>
		<p class="updated">Last updated: January 1, 2025</p>

		<section>
			<h2>1. Acceptance of Terms</h2>
			<p>By accessing and using the Squirrel Media website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
		</section>

		<section>
			<h2>2. Services</h2>
			<p>The Squirrel Media provides web design, brand identity, UI/UX design, digital strategy, content creation, and related services. The scope and terms of each project are defined in individual project agreements.</p>
		</section>

		<section>
			<h2>3. Intellectual Property</h2>
			<p>Upon full payment, clients receive ownership of the final deliverables as outlined in the project agreement. The Squirrel Media retains the right to display completed work in our portfolio and marketing materials unless explicitly agreed otherwise.</p>
			<p>All pre-existing tools, templates, and frameworks used in production remain the property of the Squirrel Media or their respective owners.</p>
		</section>

		<section>
			<h2>4. Payment Terms</h2>
			<p>Payment terms, schedules, and amounts are specified in individual project proposals. A deposit is required before work commences. Final deliverables are released upon receipt of full payment.</p>
		</section>

		<section>
			<h2>5. Revisions and Approvals</h2>
			<p>The number of revisions included in each project is specified in the project agreement. Additional revisions beyond the agreed scope may be billed at our standard hourly rate.</p>
		</section>

		<section>
			<h2>6. Limitation of Liability</h2>
			<p>The Squirrel Media shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or deliverables. Our total liability shall not exceed the amount paid for the specific service in question.</p>
		</section>

		<section>
			<h2>7. Confidentiality</h2>
			<p>We treat all client information as confidential and will not disclose it to third parties without written consent, except as required by law.</p>
		</section>

		<section>
			<h2>8. Termination</h2>
			<p>Either party may terminate a project agreement with written notice. In the event of termination, the client is responsible for payment of all work completed up to the termination date.</p>
		</section>

		<section>
			<h2>9. Governing Law</h2>
			<p>These terms are governed by the laws of the Province of Quebec, Canada. Any disputes shall be resolved in the courts of Laval, Quebec.</p>
		</section>

		<section>
			<h2>10. Contact</h2>
			<p>For questions regarding these terms, contact us:</p>
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
