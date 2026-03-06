<script>
	// ── Form state ──────────────────────────────────────────────
	let companyName   = $state('');
	let tagline       = $state('');
	let industry      = $state('');
	let website       = $state('');

	let whatYouDo     = $state('');
	let targetAudience = $state('');
	let differentiator = $state('');

	let personality   = $state([]); // array of selected traits
	let logoStyle     = $state('');
	let logosLike     = $state('');
	let logosDislike  = $state('');

	let colorExisting = $state('');
	let colorAvoid    = $state('');
	let additionalNotes = $state('');

	let contactName   = $state('');
	let contactEmail  = $state('');
	let contactPhone  = $state('');

	// ── Math captcha ────────────────────────────────────────────
	let num1 = $state(Math.floor(Math.random() * 9) + 1);
	let num2 = $state(Math.floor(Math.random() * 9) + 1);
	let captchaAnswer = $state('');

	// ── Submission state ────────────────────────────────────────
	let submitted  = $state(false);
	let submitting = $state(false);
	let errorMsg   = $state('');
	let reference  = $state('');

	function generateRef() {
		const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
		const n = Math.floor(1000 + Math.random() * 9000);
		return `TSM-BIQ-${d}-${n}`;
	}

	// ── Options ─────────────────────────────────────────────────
	const industries = [
		'Technology', 'Retail & E-commerce', 'Food & Beverage', 'Healthcare',
		'Finance & Insurance', 'Real Estate', 'Fashion & Beauty', 'Education',
		'Entertainment & Media', 'Construction & Architecture', 'Non-profit',
		'Professional Services', 'Sports & Fitness', 'Travel & Hospitality', 'Other'
	];

	const personalityOptions = [
		'Modern', 'Minimal', 'Bold', 'Luxury',
		'Traditional', 'Corporate', 'Tech-focused',
		'Playful', 'Elegant', 'Approachable'
	];

	const logoStyles = [
		{ id: 'wordmark',  label: 'Text-based logo',   desc: 'Wordmark — just your name, styled' },
		{ id: 'icon-text', label: 'Icon + Text',        desc: 'A symbol paired with your name'    },
		{ id: 'symbol',    label: 'Symbol only',        desc: 'A standalone icon or mark'         },
		{ id: 'emblem',    label: 'Emblem / Badge',     desc: 'Contained crest or badge style'    },
	];

	// ── Toggle personality ───────────────────────────────────────
	function togglePersonality(trait) {
		if (personality.includes(trait)) {
			personality = personality.filter(t => t !== trait);
		} else if (personality.length < 3) {
			personality = [...personality, trait];
		}
	}

	// ── Validation ───────────────────────────────────────────────
	const captchaCorrect = $derived(parseInt(captchaAnswer) === num1 + num2);

	const missing = $derived([
		companyName.trim().length <= 1          && 'Company name',
		industry === ''                          && 'Industry',
		whatYouDo.trim().length <= 10            && 'What your company does',
		personality.length < 1                   && 'Brand personality (select at least 1)',
		logoStyle === ''                         && 'Logo style preference',
		contactName.trim().length <= 1           && 'Your name',
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim()) && 'Valid email',
		!captchaCorrect                          && 'Captcha answer',
	].filter(Boolean));

	const canSubmit = $derived(missing.length === 0);

	// ── Submit ───────────────────────────────────────────────────
	async function submit() {
		if (!canSubmit || submitting) return;
		submitting = true;
		errorMsg   = '';

		const ref = generateRef();
		const logoLabel = logoStyles.find(s => s.id === logoStyle)?.label || '—';

		const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#111111;border:1px solid #222222;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#a855f7;">Brand Identity Brief</p>
          <h1 style="margin:0;font-size:26px;font-weight:800;color:#f5f5f5;letter-spacing:-0.03em;">New Questionnaire Submission</h1>
          <p style="margin:12px 0 0;font-size:13px;color:#888888;">Reference: <span style="color:#a855f7;font-weight:700;">${ref}</span></p>
        </td></tr>

        <!-- Contact banner -->
        <tr><td style="background:#1a0f2e;border-left:1px solid #222;border-right:1px solid #222;padding:20px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:13px;color:#888;">From</td>
              <td align="right" style="font-size:13px;color:#888;">Industry</td>
            </tr>
            <tr>
              <td style="font-size:18px;font-weight:800;color:#f5f5f5;letter-spacing:-0.02em;">${contactName.trim()}</td>
              <td align="right" style="font-size:14px;font-weight:600;color:#a855f7;">${industry}</td>
            </tr>
            <tr>
              <td style="font-size:13px;color:#a855f7;padding-top:2px;"><a href="mailto:${contactEmail.trim()}" style="color:#a855f7;text-decoration:none;">${contactEmail.trim()}</a></td>
              <td align="right" style="font-size:13px;color:#888;">${contactPhone.trim() || '—'}</td>
            </tr>
          </table>
        </td></tr>

        <!-- Section 1 -->
        <tr><td style="background:#111111;border-left:1px solid #222;border-right:1px solid #222;padding:28px 40px 0;">
          <p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a855f7;border-bottom:1px solid #222;padding-bottom:10px;">01 — Basic Information</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Company</p>
                <p style="margin:0;font-size:15px;font-weight:700;color:#f5f5f5;">${companyName.trim()}</p>
                ${tagline.trim() ? `<p style="margin:4px 0 0;font-size:12px;color:#888;font-style:italic;">"${tagline.trim()}"</p>` : ''}
              </td>
              <td width="50%" style="padding-bottom:16px;vertical-align:top;padding-left:20px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Website / Social</p>
                <p style="margin:0;font-size:14px;color:#a855f7;">${website.trim() || '—'}</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Section 2 -->
        <tr><td style="background:#111111;border-left:1px solid #222;border-right:1px solid #222;padding:0 40px;">
          <p style="margin:24px 0 16px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a855f7;border-bottom:1px solid #222;padding-bottom:10px;">02 — About the Business</p>
          <div style="margin-bottom:16px;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">What they do</p>
            <p style="margin:0;font-size:14px;color:#e0e0e0;line-height:1.65;background:#181818;border-radius:8px;padding:14px 16px;border-left:3px solid #a855f7;">${whatYouDo.trim()}</p>
          </div>
          ${targetAudience.trim() ? `<div style="margin-bottom:16px;"><p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Target audience</p><p style="margin:0;font-size:14px;color:#e0e0e0;line-height:1.65;background:#181818;border-radius:8px;padding:14px 16px;">${targetAudience.trim()}</p></div>` : ''}
          ${differentiator.trim() ? `<div style="margin-bottom:16px;"><p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Differentiator</p><p style="margin:0;font-size:14px;color:#e0e0e0;line-height:1.65;background:#181818;border-radius:8px;padding:14px 16px;">${differentiator.trim()}</p></div>` : ''}
        </td></tr>

        <!-- Section 3 & 4 -->
        <tr><td style="background:#111111;border-left:1px solid #222;border-right:1px solid #222;padding:0 40px;">
          <p style="margin:24px 0 16px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a855f7;border-bottom:1px solid #222;padding-bottom:10px;">03 — Brand &amp; Style</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Personality traits</p>
                <div>${personality.map(t => `<span style="display:inline-block;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.3);color:#a855f7;font-size:12px;font-weight:600;padding:4px 12px;border-radius:999px;margin:0 4px 6px 0;">${t}</span>`).join('')}</div>
              </td>
              <td width="50%" style="padding-bottom:16px;vertical-align:top;padding-left:20px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Logo style</p>
                <span style="display:inline-block;background:#181818;border:1px solid #333;color:#f5f5f5;font-size:13px;font-weight:700;padding:6px 16px;border-radius:8px;">${logoLabel}</span>
              </td>
            </tr>
          </table>
          ${logosLike.trim() ? `<div style="margin-bottom:16px;"><p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Logos they like</p><p style="margin:0;font-size:14px;color:#e0e0e0;background:#181818;border-radius:8px;padding:14px 16px;">${logosLike.trim()}</p></div>` : ''}
          ${logosDislike.trim() ? `<div style="margin-bottom:16px;"><p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Logos they dislike</p><p style="margin:0;font-size:14px;color:#e0e0e0;background:#181818;border-radius:8px;padding:14px 16px;">${logosDislike.trim()}</p></div>` : ''}
        </td></tr>

        <!-- Section 5 -->
        ${(colorExisting.trim() || colorAvoid.trim() || additionalNotes.trim()) ? `
        <tr><td style="background:#111111;border-left:1px solid #222;border-right:1px solid #222;padding:0 40px 24px;">
          <p style="margin:24px 0 16px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a855f7;border-bottom:1px solid #222;padding-bottom:10px;">05 — Colors &amp; Notes</p>
          ${colorExisting.trim() ? `<p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Brand colors</p><p style="margin:0 0 16px;font-size:14px;color:#e0e0e0;">${colorExisting.trim()}</p>` : ''}
          ${colorAvoid.trim() ? `<p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Colors to avoid</p><p style="margin:0 0 16px;font-size:14px;color:#e0e0e0;">${colorAvoid.trim()}</p>` : ''}
          ${additionalNotes.trim() ? `<p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.1em;">Additional notes</p><p style="margin:0;font-size:14px;color:#e0e0e0;line-height:1.65;background:#181818;border-radius:8px;padding:14px 16px;">${additionalNotes.trim()}</p>` : ''}
        </td></tr>` : ''}

        <!-- Footer -->
        <tr><td style="background:#0d0d0d;border:1px solid #222222;border-top:1px solid #a855f7;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;color:#555;">Reply directly to this email to reach ${contactName.trim().split(' ')[0]}.</p>
          <p style="margin:0;font-size:11px;color:#333;">Ref: ${ref} · the Squirrel Media · thesquirrelmedia.com</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

		const payload = {
			subject:   `[${ref}] Brand Brief — ${companyName.trim()} (${industry})`,
			from_name: 'The Squirrel Media — Brand Questionnaire',
			replyto:   contactEmail.trim(),
			message:   html,
		};

		try {
			const res  = await fetch('/api/submit', {
				method:  'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body:    JSON.stringify(payload),
			});
			const data = await res.json();
			if (data.success) {
				reference = ref;
				submitted = true;
			} else {
				errorMsg = data.message || 'Something went wrong. Please try again.';
			}
		} catch {
			errorMsg = 'Network error. Please check your connection and try again.';
		}

		submitting = false;
	}
</script>

<svelte:head>
	<title>Brand Identity Questionnaire — The Squirrel Media</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
	{#if submitted}
		<!-- ── Success screen ────────────────────────────────── -->
		<div class="success-wrap">
			<div class="success-card">
				<div class="check-wrap">
					<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
						<circle cx="24" cy="24" r="23" stroke="var(--color-accent)" stroke-width="1.5"/>
						<path d="M13 24.5l8.5 8.5L35 17" stroke="var(--color-accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<h2>Thank you, {contactName.split(' ')[0]}!</h2>
				<p>Your brand questionnaire has been received. We'll review it and get back to you within <em>24 – 48 hours</em>.</p>
				<div class="ref-block">
					<span class="ref-label">Reference number</span>
					<span class="ref-value">{reference}</span>
					<span class="ref-sub">Quote this when following up</span>
				</div>
			</div>
		</div>

	{:else}
		<!-- ── Form ──────────────────────────────────────────── -->
		<div class="form-wrap">
			<div class="form-intro">
				<div class="intro-header">
					<a href="https://thesquirrelmedia.com" target="_blank" rel="noopener" class="logo-link">
						<img src="/images/logos/squirrel-logo.svg" alt="the Squirrel Media" class="intro-logo" />
					</a>
					<a href="https://thesquirrelmedia.com" class="back-link" target="_blank" rel="noopener">
						← Back to Website
					</a>
				</div>
				<span class="section-tag">Brand Identity Brief</span>
				<h1>Brand Identity Questionnaire</h1>
				<p class="intro-sub">Help us understand your brand so we can create something that truly represents you. Takes about 5 minutes.</p>
			</div>

			<form onsubmit={(e) => { e.preventDefault(); submit(); }}>

				<!-- ── Section 1: Basic Information ─────────── -->
				<section class="form-section">
					<div class="section-header">
						<span class="section-num">01</span>
						<div>
							<h2>Basic Information</h2>
							<p class="section-sub">Let's start with the essentials.</p>
						</div>
					</div>

					<div class="fields">
						<label class="field">
							<span class="field-label">Company name <span class="req">*</span></span>
							<input type="text" bind:value={companyName} placeholder="Acme Inc." />
						</label>

						<label class="field">
							<span class="field-label">Tagline <span class="opt">if any</span></span>
							<input type="text" bind:value={tagline} placeholder="Just do it. / Think different." />
						</label>

						<label class="field">
							<span class="field-label">Industry <span class="req">*</span></span>
							<div class="select-wrap">
								<select bind:value={industry}>
									<option value="" disabled>Select your industry…</option>
									{#each industries as ind}
										<option value={ind}>{ind}</option>
									{/each}
								</select>
								<svg class="select-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
									<path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
								</svg>
							</div>
						</label>

						<label class="field">
							<span class="field-label">Website / social media <span class="opt">if available</span></span>
							<input type="text" bind:value={website} placeholder="https://yoursite.com or @yourhandle" />
						</label>
					</div>
				</section>

				<!-- ── Section 2: About the Business ────────── -->
				<section class="form-section">
					<div class="section-header">
						<span class="section-num">02</span>
						<div>
							<h2>About the Business</h2>
							<p class="section-sub">Tell us what makes you tick.</p>
						</div>
					</div>

					<div class="fields">
						<label class="field">
							<span class="field-label">What does your company do? <span class="req">*</span></span>
							<textarea bind:value={whatYouDo} rows="3" placeholder="We sell premium handmade leather goods to professionals who value quality and craftsmanship…"></textarea>
						</label>

						<label class="field">
							<span class="field-label">Who is your target audience? <span class="opt">optional</span></span>
							<textarea bind:value={targetAudience} rows="2" placeholder="Young professionals aged 25–40, design-conscious, urban…"></textarea>
						</label>

						<label class="field">
							<span class="field-label">What makes you different from competitors? <span class="opt">optional</span></span>
							<textarea bind:value={differentiator} rows="2" placeholder="We use only ethically sourced materials and offer lifetime repair guarantees…"></textarea>
						</label>
					</div>
				</section>

				<!-- ── Section 3: Brand Personality ─────────── -->
				<section class="form-section">
					<div class="section-header">
						<span class="section-num">03</span>
						<div>
							<h2>Brand Personality</h2>
							<p class="section-sub">Select 2–3 words that best describe your brand. <span class="selected-count" class:maxed={personality.length >= 3}>{personality.length}/3 selected</span></p>
						</div>
					</div>

					<div class="trait-grid">
						{#each personalityOptions as trait}
							<button
								type="button"
								class="trait-chip"
								class:selected={personality.includes(trait)}
								class:disabled={!personality.includes(trait) && personality.length >= 3}
								onclick={() => togglePersonality(trait)}
							>
								{#if personality.includes(trait)}<span class="trait-check">✓</span>{/if}
								{trait}
							</button>
						{/each}
					</div>
				</section>

				<!-- ── Section 4: Style Preferences ─────────── -->
				<section class="form-section">
					<div class="section-header">
						<span class="section-num">04</span>
						<div>
							<h2>Style Preferences</h2>
							<p class="section-sub">Help us understand your visual direction.</p>
						</div>
					</div>

					<div class="fields">
						<fieldset class="field">
							<legend class="field-label">Logo style preference <span class="req">*</span></legend>
							<div class="logo-style-grid">
								{#each logoStyles as ls}
									<button
										type="button"
										class="svc-card"
										class:selected={logoStyle === ls.id}
										onclick={() => logoStyle = ls.id}
									>
										<span class="svc-label">{ls.label}</span>
										<span class="svc-desc">{ls.desc}</span>
										{#if logoStyle === ls.id}<span class="svc-check">✓</span>{/if}
									</button>
								{/each}
							</div>
						</fieldset>

						<label class="field">
							<span class="field-label">Logos / brands you like <span class="opt">paste links or describe</span></span>
							<textarea bind:value={logosLike} rows="2" placeholder="Nike, Apple, Aesop — clean, minimal, strong wordmarks. Links: https://…"></textarea>
						</label>

						<label class="field">
							<span class="field-label">Logos / brands you dislike <span class="opt">paste links or describe</span></span>
							<textarea bind:value={logosDislike} rows="2" placeholder="Too busy, too many colors, clip-art style…"></textarea>
						</label>
					</div>
				</section>

				<!-- ── Section 5: Colors & Notes ─────────────── -->
				<section class="form-section">
					<div class="section-header">
						<span class="section-num">05</span>
						<div>
							<h2>Colors & Extra Notes</h2>
							<p class="section-sub">Any color direction or final thoughts?</p>
						</div>
					</div>

					<div class="fields">
						<label class="field">
							<span class="field-label">Existing brand colors <span class="opt">hex codes or descriptions</span></span>
							<input type="text" bind:value={colorExisting} placeholder="#1a1a2e, deep navy + gold, etc." />
						</label>

						<label class="field">
							<span class="field-label">Colors to avoid <span class="opt">optional</span></span>
							<input type="text" bind:value={colorAvoid} placeholder="No bright yellows or fluorescent tones…" />
						</label>

						<label class="field">
							<span class="field-label">Additional notes <span class="opt">optional</span></span>
							<textarea bind:value={additionalNotes} rows="3" placeholder="Any other context, inspiration, deadlines, or special requests…"></textarea>
						</label>
					</div>
				</section>

				<!-- ── Section 6: Contact Info ────────────────── -->
				<section class="form-section">
					<div class="section-header">
						<span class="section-num">06</span>
						<div>
							<h2>Your Contact Info</h2>
							<p class="section-sub">So we can follow up with your brand proposal.</p>
						</div>
					</div>

					<div class="fields">
						<label class="field">
							<span class="field-label">Full name <span class="req">*</span></span>
							<input type="text" bind:value={contactName} placeholder="Jane Doe" />
						</label>

						<label class="field">
							<span class="field-label">Email address <span class="req">*</span></span>
							<input type="email" bind:value={contactEmail} placeholder="hello@yourcompany.com" />
						</label>

						<label class="field">
							<span class="field-label">Phone number <span class="opt">optional</span></span>
							<input type="tel" bind:value={contactPhone} placeholder="+1 555 000 0000" />
						</label>
					</div>
				</section>

				<!-- ── Captcha ────────────────────────────────── -->
				<section class="captcha-section">
					<label class="field">
						<span class="field-label captcha-label">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
								<path d="M7 1a6 6 0 100 12A6 6 0 007 1zM7 5v3M7 9.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
							</svg>
							Quick check — what is {num1} + {num2}?
						</span>
						<input
							type="number"
							bind:value={captchaAnswer}
							placeholder="Enter the answer"
							class="captcha-input"
							class:correct={captchaCorrect}
						/>
					</label>
				</section>

				<!-- ── Error ──────────────────────────────────── -->
				{#if errorMsg}
					<div class="error-msg">{errorMsg}</div>
				{/if}

				<!-- ── Missing fields hint ───────────────────── -->
				{#if missing.length > 0}
					<div class="missing-hint">
						<span class="missing-title">Still needed:</span>
						{missing.join(' · ')}
					</div>
				{/if}

				<!-- ── Submit ─────────────────────────────────── -->
				<div class="submit-row">
					<p class="submit-note">We'll get back to you within 24 – 48 hours after reviewing your brief.</p>
					<button type="submit" class="btn-submit" disabled={!canSubmit || submitting}>
						{#if submitting}
							<span class="spinner"></span> Sending…
						{:else}
							Submit Questionnaire →
						{/if}
					</button>
				</div>

			</form>
		</div>
	{/if}

</main>

<style>
	main {
		min-height: 100svh;
		background: var(--color-bg);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* ── Intro header ── */
	.intro-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 32px;
	}

	.logo-link { display: block; line-height: 0; }

	.intro-logo {
		height: 52px;
		width: auto;
		display: block;
		transition: opacity 0.2s ease;
	}
	.logo-link:hover .intro-logo { opacity: 0.75; }

	.back-link {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-text-dim);
		text-decoration: none;
		transition: color 0.2s ease;
		letter-spacing: 0.01em;
	}
	.back-link:hover { color: var(--color-accent); }

	/* ── Form wrap ── */
	.form-wrap {
		width: min(720px, 92%);
		padding: 60px 0 80px;
	}

	.form-intro {
		margin-bottom: 52px;
	}

	h1 {
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		color: var(--color-text);
		margin-bottom: 12px;
	}

	.intro-sub {
		font-size: 0.95rem;
		color: var(--color-text-muted);
		line-height: 1.65;
		max-width: 520px;
	}

	/* ── Form section ── */
	.form-section {
		margin-bottom: 48px;
		padding: 32px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 20px;
	}

	.section-header {
		display: flex;
		align-items: flex-start;
		gap: 18px;
		margin-bottom: 28px;
		padding-bottom: 22px;
		border-bottom: 1px solid var(--color-border);
	}

	.section-num {
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		color: var(--color-accent);
		background: rgba(168, 85, 247, 0.1);
		border: 1px solid rgba(168, 85, 247, 0.25);
		border-radius: 8px;
		padding: 6px 10px;
		flex-shrink: 0;
		margin-top: 3px;
	}

	h2 {
		font-size: 1.25rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--color-text);
		margin-bottom: 4px;
	}

	.section-sub {
		font-size: 0.83rem;
		color: var(--color-text-muted);
		line-height: 1.5;
		margin: 0;
	}

	.selected-count {
		display: inline-block;
		margin-left: 6px;
		font-size: 0.72rem;
		font-weight: 700;
		color: var(--color-accent);
		background: rgba(168, 85, 247, 0.1);
		padding: 2px 8px;
		border-radius: 999px;
	}
	.selected-count.maxed { color: #30d158; background: rgba(48, 209, 88, 0.1); }

	/* ── Fields ── */
	.fields {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	fieldset.field {
		border: none;
		padding: 0;
	}

	.field-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-text-muted);
		letter-spacing: 0.02em;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.req { color: var(--color-accent); }
	.opt { font-weight: 400; color: var(--color-text-dim); font-size: 0.74rem; }

	input[type='text'],
	input[type='email'],
	input[type='tel'],
	input[type='number'],
	select {
		width: 100%;
		box-sizing: border-box;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: 10px;
		padding: 13px 16px;
		color: var(--color-text);
		font-family: var(--font);
		font-size: 0.92rem;
		transition: border-color 0.2s ease;
	}
	input:focus, select:focus {
		outline: none;
		border-color: rgba(168, 85, 247, 0.5);
	}
	input::placeholder { color: var(--color-text-dim); }
	input.correct { border-color: rgba(48, 209, 88, 0.5); }

	textarea {
		width: 100%;
		box-sizing: border-box;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: 10px;
		padding: 13px 16px;
		color: var(--color-text);
		font-family: var(--font);
		font-size: 0.92rem;
		line-height: 1.6;
		resize: vertical;
		transition: border-color 0.2s ease;
	}
	textarea:focus { outline: none; border-color: rgba(168, 85, 247, 0.5); }
	textarea::placeholder { color: var(--color-text-dim); }

	/* ── Select wrapper ── */
	.select-wrap {
		position: relative;
	}
	select {
		appearance: none;
		-webkit-appearance: none;
		padding-right: 40px;
		cursor: pointer;
	}
	select option { background: #1a1a1a; }
	.select-arrow {
		position: absolute;
		right: 16px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-text-muted);
		pointer-events: none;
	}

	/* ── Trait chips ── */
	.trait-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.trait-chip {
		padding: 10px 20px;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text-muted);
		font-family: var(--font);
		font-size: 0.88rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.trait-chip:hover:not(.disabled) {
		border-color: rgba(168, 85, 247, 0.4);
		color: var(--color-text);
	}
	.trait-chip.selected {
		border-color: var(--color-accent);
		background: rgba(168, 85, 247, 0.12);
		color: var(--color-accent);
	}
	.trait-chip.disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
	.trait-check {
		font-size: 0.7rem;
		font-weight: 800;
	}

	/* ── Logo style grid ── */
	.logo-style-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-top: 4px;
	}

	.svc-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 18px 20px;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		background: transparent;
		cursor: pointer;
		text-align: left;
		transition: all 0.22s ease;
		font-family: var(--font);
	}
	.svc-card:hover {
		border-color: rgba(168, 85, 247, 0.4);
		background: rgba(168, 85, 247, 0.04);
	}
	.svc-card.selected {
		border-color: var(--color-accent);
		background: rgba(168, 85, 247, 0.08);
	}

	.svc-label {
		font-size: 0.92rem;
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: 4px;
	}
	.svc-desc {
		font-size: 0.76rem;
		color: var(--color-text-muted);
		line-height: 1.4;
	}
	.svc-check {
		position: absolute;
		top: 10px;
		right: 12px;
		font-size: 0.7rem;
		font-weight: 800;
		color: var(--color-accent);
	}

	/* ── Captcha ── */
	.captcha-section {
		margin-bottom: 32px;
		padding: 24px 28px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 16px;
	}

	.captcha-label {
		color: var(--color-text-muted);
		font-size: 0.82rem;
	}

	.captcha-input {
		max-width: 160px !important;
	}

	/* ── Missing hint ── */
	.missing-hint {
		margin-bottom: 16px;
		padding: 12px 16px;
		background: rgba(168, 85, 247, 0.06);
		border: 1px solid rgba(168, 85, 247, 0.2);
		border-radius: 10px;
		font-size: 0.78rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}
	.missing-title {
		font-weight: 700;
		color: var(--color-accent);
		margin-right: 6px;
	}

	/* ── Error ── */
	.error-msg {
		margin-bottom: 20px;
		padding: 14px 18px;
		background: rgba(255, 69, 58, 0.1);
		border: 1px solid rgba(255, 69, 58, 0.3);
		border-radius: 10px;
		color: #ff453a;
		font-size: 0.85rem;
	}

	/* ── Submit ── */
	.submit-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		flex-wrap: wrap;
	}

	.submit-note {
		font-size: 0.8rem;
		color: var(--color-text-dim);
		line-height: 1.5;
		margin: 0;
		max-width: 300px;
	}

	.btn-submit {
		padding: 14px 36px;
		border-radius: 999px;
		background: var(--color-accent);
		border: none;
		color: #fff;
		font-family: var(--font);
		font-size: 0.95rem;
		font-weight: 700;
		cursor: pointer;
		letter-spacing: 0.01em;
		transition: all 0.25s ease;
		display: flex;
		align-items: center;
		gap: 8px;
		white-space: nowrap;
	}
	.btn-submit:hover:not(:disabled) {
		background: var(--color-accent-hover);
		transform: scale(1.03);
		box-shadow: 0 0 28px rgba(168, 85, 247, 0.4);
	}
	.btn-submit:disabled { opacity: 0.35; cursor: not-allowed; }

	/* ── Spinner ── */
	.spinner {
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255,255,255,0.3);
		border-top-color: #fff;
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}
	@keyframes spin { to { transform: rotate(360deg); } }

	/* ── Success screen ── */
	.success-wrap {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 60px 20px;
	}

	.success-card {
		width: min(480px, 100%);
		padding: 48px 40px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 18px;
	}

	.check-wrap {
		animation: popIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}
	@keyframes popIn {
		from { transform: scale(0.3); opacity: 0; }
		to   { transform: scale(1);   opacity: 1; }
	}

	.success-card h2 {
		font-size: 1.8rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--color-text);
	}

	.success-card p {
		font-size: 0.92rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}
	.success-card p em {
		color: var(--color-text);
		font-style: normal;
		font-weight: 600;
	}

	.ref-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 16px 48px;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		background: var(--color-surface-2);
		width: 100%;
		box-sizing: border-box;
	}

	.ref-label {
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.ref-value {
		font-size: 1.1rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		color: var(--color-accent);
		font-variant-numeric: tabular-nums;
	}

	.ref-sub {
		font-size: 0.68rem;
		color: var(--color-text-dim);
		letter-spacing: 0.04em;
	}

	/* ── Mobile ── */
	@media (max-width: 600px) {
		.form-section { padding: 22px 18px; }
		.logo-style-grid { grid-template-columns: 1fr; }
		.section-header { flex-direction: column; gap: 10px; }
		.submit-row { flex-direction: column; align-items: flex-start; }
		.btn-submit { width: 100%; justify-content: center; }
		.captcha-input { max-width: 100% !important; }
	}
</style>
