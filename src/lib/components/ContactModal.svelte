<script>
	import { modalOpen } from '$lib/stores/ui.js';
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let step        = $state(1);
	let service     = $state('');
	let digitalType = $state('');
	let description = $state('');
	let fullName    = $state('');
	let email       = $state('');
	let phone       = $state('');
	let reference   = $state('');
	let submitting  = $state(false);

	function close() {
		$modalOpen = false;
		setTimeout(() => {
			step = 1; service = ''; digitalType = ''; description = '';
			fullName = ''; email = ''; phone = ''; reference = '';
		}, 380);
	}

	function generateRef() {
		const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
		const n = Math.floor(1000 + Math.random() * 9000);
		return `TSM-${d}-${n}`;
	}

	async function submit() {
		submitting = true;
		await new Promise(r => setTimeout(r, 900));
		reference  = generateRef();
		submitting = false;
		step       = 4;
	}

	const services = [
		{ id: 'branding',     label: 'Branding',             desc: 'Logo, identity & print'     },
		{ id: 'digital',      label: 'Digital Product',      desc: 'Website or App'             },
		{ id: 'content',      label: 'Content Creation',     desc: 'Social Media Management'    },
		{ id: 'photography',  label: 'Products Photography', desc: 'Professional product shots' },
	];

	const canNext1  = $derived(!!service && (service !== 'digital' || !!digitalType));
	const canNext2  = $derived(description.trim().length >= 10);
	const canSubmit = $derived(
		fullName.trim().length > 1 &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
	);

	const stepLabels = ['Service', 'Project', 'Contact'];
</script>

{#if $modalOpen}
	<!-- Overlay: click outside = close -->
	<div
		class="overlay"
		transition:fade={{ duration: 280 }}
		onclick={close}
		role="presentation"
	>
		<!-- Modal: stop propagation so clicks inside don't close -->
		<div
			class="modal"
			transition:fly={{ y: 48, duration: 380, easing: cubicOut }}
			role="dialog"
			aria-modal="true"
			aria-label="Collaboration inquiry"
			onclick={(e) => e.stopPropagation()}
		>

			<!-- ── Header ── -->
			<div class="modal-header">
				{#if step < 4}
					<div class="steps">
						{#each stepLabels as label, i}
							<div class="step-item" class:active={step === i + 1} class:done={step > i + 1}>
								<span class="step-num">{step > i + 1 ? '✓' : i + 1}</span>
								<span class="step-label">{label}</span>
							</div>
							{#if i < 2}
								<div class="step-connector" class:done={step > i + 1}></div>
							{/if}
						{/each}
					</div>
				{:else}
					<div></div>
				{/if}

				<button class="close-btn" onclick={close} aria-label="Close">
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
						<path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>
			</div>

			<!-- ── Body ── -->
			<div class="modal-body">
				{#key step}
					<div class="step-content" in:fly={{ y: 18, duration: 220, easing: cubicOut }}>

						{#if step === 1}
							<h3>What are you looking for?</h3>
							<p class="step-sub">Select the service that fits your needs.</p>

							<div class="svc-grid">
								{#each services as svc}
									<button
										class="svc-card"
										class:selected={service === svc.id}
										onclick={() => { service = svc.id; if (svc.id !== 'digital') digitalType = ''; }}
									>
										<span class="svc-label">{svc.label}</span>
										<span class="svc-desc">{svc.desc}</span>
										{#if service === svc.id}
											<span class="svc-check">✓</span>
										{/if}
									</button>
								{/each}
							</div>

							{#if service === 'digital'}
								<div class="sub-options" transition:fly={{ y: 10, duration: 200, easing: cubicOut }}>
									<span class="sub-q">What type of digital product?</span>
									<div class="chips">
										<button class="chip" class:selected={digitalType === 'website'} onclick={() => digitalType = 'website'}>Website</button>
										<button class="chip" class:selected={digitalType === 'app'} onclick={() => digitalType = 'app'}>App</button>
									</div>
								</div>
							{/if}

						{:else if step === 2}
							<h3>Tell us about your project.</h3>
							<p class="step-sub">A brief goes a long way — describe your vision, goals, or timeline.</p>
							<textarea
								bind:value={description}
								placeholder="We're looking to redesign our brand and launch a new website by Q3..."
								rows="6"
							></textarea>
							<span class="hint" class:active={canNext2}>
								{description.trim().length} / 10 min characters
							</span>

						{:else if step === 3}
							<h3>How can we reach you?</h3>
							<p class="step-sub">We'll send a confirmation and follow up within 24 – 48 hours.</p>
							<div class="fields">
								<label class="field">
									<span class="field-label">Full Name <span class="req">*</span></span>
									<input type="text" bind:value={fullName} placeholder="Jane Doe" />
								</label>
								<label class="field">
									<span class="field-label">Email <span class="req">*</span></span>
									<input type="email" bind:value={email} placeholder="hello@yourcompany.com" />
								</label>
								<label class="field">
									<span class="field-label">Phone <span class="opt">optional</span></span>
									<input type="tel" bind:value={phone} placeholder="+1 555 000 0000" />
								</label>
							</div>

						{:else if step === 4}
							<div class="thankyou">
								<div class="check-wrap">
									<svg width="40" height="40" viewBox="0 0 40 40" fill="none">
										<circle cx="20" cy="20" r="19" stroke="var(--color-accent)" stroke-width="1.5"/>
										<path d="M11 20.5l7 7 11-14" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</div>
								<h3>Thank you, {fullName.split(' ')[0]}!</h3>
								<p class="step-sub">
									Your inquiry has been received. We'll get back to you within <em>24 – 48 hours</em>.
								</p>
								<div class="ref-block">
									<span class="ref-label">Reference number</span>
									<span class="ref-code">{reference}</span>
								</div>
								<button class="btn-primary wide" onclick={close}>Done</button>
							</div>
						{/if}

					</div>
				{/key}
			</div>

			<!-- ── Footer nav ── -->
			{#if step < 4}
				<div class="modal-footer">
					<button class="btn-ghost" onclick={() => step > 1 ? step-- : close()}>
						{step > 1 ? '← Back' : 'Cancel'}
					</button>

					{#if step < 3}
						<button
							class="btn-primary"
							disabled={step === 1 ? !canNext1 : !canNext2}
							onclick={() => step++}
						>Continue →</button>
					{:else}
						<button
							class="btn-primary"
							disabled={!canSubmit || submitting}
							onclick={submit}
						>{submitting ? 'Sending…' : "Let's Connect"}</button>
					{/if}
				</div>
			{/if}

		</div>
	</div>
{/if}

<style>
	/* ── Overlay ── */
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 9000;
		background: rgba(0, 0, 0, 0.82);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	/* ── Modal ── */
	.modal {
		width: min(540px, 100%);
		max-height: 90svh;
		overflow-y: auto;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		scrollbar-width: none;
	}
	.modal::-webkit-scrollbar { display: none; }

	/* ── Header ── */
	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 24px 18px;
		border-bottom: 1px solid var(--color-border);
		flex-shrink: 0;
	}

	.steps {
		display: flex;
		align-items: center;
	}

	.step-item {
		display: flex;
		align-items: center;
		gap: 8px;
		opacity: 0.4;
		transition: opacity 0.3s ease;
	}
	.step-item.active, .step-item.done { opacity: 1; }

	.step-num {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 1.5px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.68rem;
		font-weight: 700;
		color: var(--color-text-muted);
		flex-shrink: 0;
		transition: all 0.3s ease;
	}
	.step-item.active .step-num {
		border-color: var(--color-accent);
		background: rgba(168, 85, 247, 0.15);
		color: var(--color-accent);
	}
	.step-item.done .step-num {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: #fff;
		font-size: 0.6rem;
	}

	.step-label {
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--color-text-muted);
	}
	.step-item.active .step-label { color: var(--color-text); }

	.step-connector {
		width: 28px;
		height: 1px;
		background: var(--color-border);
		margin: 0 8px;
		transition: background 0.3s ease;
		flex-shrink: 0;
	}
	.step-connector.done { background: rgba(168, 85, 247, 0.4); }

	.close-btn {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-muted);
		cursor: pointer;
		background: transparent;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}
	.close-btn:hover { border-color: rgba(168,85,247,0.4); color: var(--color-text); }

	/* ── Body ── */
	.modal-body {
		padding: 28px 24px 12px;
		flex: 1;
		min-height: 300px;
	}

	.step-content { }

	h3 {
		font-size: clamp(1.3rem, 3vw, 1.75rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		margin-bottom: 8px;
		color: var(--color-text);
	}

	.step-sub {
		font-size: 0.88rem;
		color: var(--color-text-muted);
		margin-bottom: 24px;
		line-height: 1.55;
	}
	.step-sub em { color: var(--color-text); font-style: normal; font-weight: 600; }

	/* ── Service cards ── */
	.svc-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-bottom: 16px;
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

	/* ── Sub options (Website / App) ── */
	.sub-options {
		margin-top: 4px;
		padding: 16px 18px;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		background: var(--color-surface-2);
	}

	.sub-q {
		display: block;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-text-muted);
		margin-bottom: 12px;
	}

	.chips {
		display: flex;
		gap: 8px;
	}

	.chip {
		padding: 8px 22px;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-text-muted);
		background: transparent;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.chip:hover { border-color: rgba(168,85,247,0.4); color: var(--color-text); }
	.chip.selected { border-color: var(--color-accent); background: rgba(168,85,247,0.15); color: var(--color-accent); }

	/* ── Textarea ── */
	textarea {
		width: 100%;
		box-sizing: border-box;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 16px;
		color: var(--color-text);
		font-family: inherit;
		font-size: 0.9rem;
		line-height: 1.6;
		resize: vertical;
		transition: border-color 0.2s ease;
	}
	textarea:focus { outline: none; border-color: rgba(168,85,247,0.5); }
	textarea::placeholder { color: var(--color-text-dim); }

	.hint {
		display: block;
		font-size: 0.74rem;
		color: var(--color-text-dim);
		margin-top: 8px;
		transition: color 0.25s ease;
	}
	.hint.active { color: var(--color-accent); }

	/* ── Contact fields ── */
	.fields {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.field-label {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--color-text-muted);
		letter-spacing: 0.02em;
	}
	.req { color: var(--color-accent); }
	.opt { font-weight: 400; color: var(--color-text-dim); font-size: 0.73rem; }

	input[type='text'],
	input[type='email'],
	input[type='tel'] {
		width: 100%;
		box-sizing: border-box;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: 10px;
		padding: 12px 16px;
		color: var(--color-text);
		font-family: inherit;
		font-size: 0.9rem;
		transition: border-color 0.2s ease;
	}
	input:focus { outline: none; border-color: rgba(168,85,247,0.5); }
	input::placeholder { color: var(--color-text-dim); }

	/* ── Thank you ── */
	.thankyou {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
		padding: 8px 0 4px;
	}

	.check-wrap {
		animation: popIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}
	@keyframes popIn {
		from { transform: scale(0.3); opacity: 0; }
		to   { transform: scale(1);   opacity: 1; }
	}

	.ref-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 14px 40px;
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

	.ref-code {
		font-size: 1.05rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: var(--color-accent);
		font-variant-numeric: tabular-nums;
	}

	/* ── Footer ── */
	.modal-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 24px 20px;
		border-top: 1px solid var(--color-border);
		flex-shrink: 0;
		margin-top: 16px;
	}

	/* ── Buttons ── */
	.btn-primary {
		padding: 12px 28px;
		border-radius: 999px;
		background: var(--color-accent);
		border: none;
		color: #fff;
		font-family: inherit;
		font-size: 0.92rem;
		font-weight: 700;
		cursor: pointer;
		letter-spacing: 0.01em;
		transition: all 0.25s ease;
	}
	.btn-primary.wide { min-width: 140px; }
	.btn-primary:hover:not(:disabled) {
		background: var(--color-accent-hover);
		transform: scale(1.03);
		box-shadow: 0 0 28px rgba(168, 85, 247, 0.4);
	}
	.btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }

	.btn-ghost {
		padding: 12px 20px;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text-muted);
		font-family: inherit;
		font-size: 0.88rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.btn-ghost:hover { color: var(--color-text); border-color: rgba(168,85,247,0.3); }

	/* ── Mobile ── */
	@media (max-width: 480px) {
		.overlay { padding: 12px; align-items: flex-end; }
		.modal { border-radius: 20px 20px 12px 12px; max-height: 95svh; }
		.svc-grid { grid-template-columns: 1fr; }
		.step-label { display: none; }
		.step-connector { width: 16px; margin: 0 4px; }
		.modal-body { padding: 22px 18px 8px; }
		.modal-footer { padding: 14px 18px 18px; }
		.modal-header { padding: 16px 18px 14px; }
	}
</style>
