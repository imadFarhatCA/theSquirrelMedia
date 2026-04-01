<script>
	import { onMount } from 'svelte';
	import { inview } from '$lib/actions/inview.js';

	const accounts = [
		{ name: 'T360pay',      tag: '@t360pay',      image: '/socialMedia/T360 SM2026.png',  color: '#3b82f6', label: 'Fintech' },
		{ name: 'ASC Training', tag: '@asctraining',  image: '/socialMedia/ASC SM2026.png',   color: '#10b981', label: 'Construction<br>& Renovations' },
		{ name: 'VDM',          tag: '@vdm_officiel', image: '/socialMedia/VDM SM2026.png',   color: '#f59e0b', label: 'Food & Beverage' },
		{ name: 'EMAK',         tag: '@emak_official',image: '/socialMedia/EMAK SM2026.png',  color: '#ec4899', label: 'Technology' },
		{ name: 'GEA',          tag: '@gea_official', image: '/socialMedia/GEA SM2026.png',   color: '#8b5cf6', label: 'Insurance' },
	];

	const total = accounts.length;
	let current   = $state(0);
	let leaving   = $state(-1);
	let slideDir  = $state('');
	let animating = $state(false);
	let time      = $state('');
	let freqVal   = $state(1);
	let postVal   = $state(4);
	let reachVal  = $state(0);
	let loopId    = null;

	function prev() { go(-1); }
	function next() { go(1); }

	function animateCounters() {
		freqVal = 1; postVal = 4; reachVal = 0;
		setTimeout(() => { freqVal = 2; postVal = 7; reachVal = 15; }, 500);
		setTimeout(() => { freqVal = 3; postVal = 10; reachVal = 40; }, 1000);
	}

	function startLoop() {
		if (loopId) clearInterval(loopId);
		animateCounters();
		loopId = setInterval(animateCounters, 3000);
	}

	function go(dir) {
		if (animating) return;
		animating = true;
		leaving   = current;
		current   = (current + dir + total) % total;
		slideDir  = dir > 0 ? 'left' : 'right';
		startLoop();
		setTimeout(() => {
			animating = false;
			leaving   = -1;
			slideDir  = '';
		}, 350);
	}

	onMount(() => {
		const tick = () => {
			time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
		};
		tick();
		const id = setInterval(tick, 1000);
		startLoop();
		return () => { clearInterval(id); if (loopId) clearInterval(loopId); };
	});
</script>

<section id="social">
	<div class="sm-layout">
		<!-- Left: info (matches WebPortfolio structure) -->
		<div class="sm-info reveal-left" use:inview>
			<span class="section-tag">Social Media</span>
			<h2>Walls that stop<br>the <span class="accent">scroll</span>.</h2>

			<div class="project-details">
				{#each accounts as acc, i}
					<div class="project-text" class:active={i === current}>
						<span class="project-num">{String(i + 1).padStart(2, '0')}</span>
						<h3>{acc.name}</h3>
						<p class="project-aka">{acc.tag}</p>
						<p class="project-desc">Content designed for <strong>{acc.label}</strong> — tailored to the brand voice, consistent across platforms, and built to convert followers into clients.</p>
						<div class="tech-pills">
							<span class="pill">Content Strategy</span>
							<span class="pill">Visual Design</span>
							<span class="pill">{acc.label}</span>
						</div>
					</div>
				{/each}
			</div>

			<div class="nav-controls">
				<button class="nav-btn" onclick={prev} aria-label="Previous">
					<svg width="26" height="26" viewBox="0 0 20 20" fill="none">
						<path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<span class="nav-count">{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
				<button class="nav-btn" onclick={next} aria-label="Next">
					<svg width="26" height="26" viewBox="0 0 20 20" fill="none">
						<path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Right: phone -->
		<div class="sm-visual reveal-right" use:inview>
			<div class="phone-wrap">
				<!-- Floating card: category + stats -->
				<div class="fc fc-top">
					<div class="fc-header">
						<div class="fc-icon" style="background:{accounts[current].color}">
							<svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M3 7l7-4 7 4v6l-7 4-7-4V7z" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 3v14M3 7l7 4 7-4" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>
						</div>
						<div>
							<div class="fc-name">{@html accounts[current].label}</div>
							<div class="fc-sub">Category</div>
						</div>
					</div>
					<div class="fc-stats">
						<div class="fc-stat">
							<div class="roller-h">
								<div class="roller-h-track" style="transform:translateX(-{(freqVal - 1) * 100}%)">
									<span class="fc-stat-val">1x</span>
									<span class="fc-stat-val">2x</span>
									<span class="fc-stat-val">3x</span>
								</div>
							</div>
							<span class="fc-stat-lbl">weekly</span>
						</div>
						<div class="fc-stat-sep"></div>
						<div class="fc-stat">
							<div class="roller-v">
								<div class="roller-v-track" style="transform:translateY(-{(postVal === 4 ? 0 : postVal === 7 ? 1 : 2) * 18}px)">
									<span class="fc-stat-val">4</span>
									<span class="fc-stat-val">7</span>
									<span class="fc-stat-val">10</span>
								</div>
							</div>
							<span class="fc-stat-lbl">posts/mo</span>
						</div>
						<div class="fc-stat-sep"></div>
						<div class="fc-stat">
							<div class="roller-v">
								<div class="roller-v-track" style="transform:translateY(-{(reachVal === 0 ? 0 : reachVal === 15 ? 1 : 2) * 18}px)">
									<span class="fc-stat-val">+0%</span>
									<span class="fc-stat-val">+15%</span>
									<span class="fc-stat-val">+40%</span>
								</div>
							</div>
							<span class="fc-stat-lbl">reach</span>
						</div>
					</div>
				</div>

				<!-- Floating card: deliverables -->
				<div class="fc fc-bot">
					<div class="fc-header">
						<div class="fc-icon" style="background:var(--color-accent)">
							<svg viewBox="0 0 20 20" fill="none" width="16" height="16"><rect x="3" y="3" width="14" height="14" rx="3" stroke="#fff" stroke-width="1.5"/><path d="M7 10h6M10 7v6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
						</div>
						<div>
							<div class="fc-name">Deliverables</div>
							<div class="fc-sub">Monthly package</div>
						</div>
					</div>
					<div class="fc-tag-roller">
						<div class="fc-tag-track">
							<span class="fc-tag fc-tag-pink">Reels</span>
							<span class="fc-tag fc-tag-blue">Stories</span>
							<span class="fc-tag fc-tag-green">Grid Posts</span>
							<span class="fc-tag fc-tag-amber">Captions</span>
						</div>
					</div>
				</div>

				<!-- Floating reactions (SVG strokes) -->
				<span class="reaction r1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg></span>
				<span class="reaction r2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-1.5-1.5-6-5.5-8-8.5C2 9.5 3 6 6 5c2-.7 4.5 0 6 2 1.5-2 4-.7 6 0 3 1 4 4.5 2 7.5-2 3-6.5 7-8 8.5z"/></svg></span>
				<span class="reaction r3"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-6 0v4"/><path d="M5 9h14l1 12H4L5 9z"/></svg></span>
				<span class="reaction r4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg></span>
				<span class="reaction r5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
				<span class="reaction r6"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg></span>
				<span class="reaction r7"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg></span>

				<!-- Engagement bubbles -->
				<div class="engage-bubble eb1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg> 2.4k</div>
				<div class="engage-bubble eb2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> 342</div>
				<div class="engage-bubble eb3"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> 12k</div>
				<div class="engage-bubble eb4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> 891</div>
				<div class="engage-bubble eb5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 5.2k</div>

				<!-- Phone -->
				<div class="phone-outer">
					<img src="/socialMedia/iphoneMockup.png" alt="" class="phone-img" aria-hidden="true"/>
					<div class="ph-screen">
						<div class="status-row">
							<span class="sb-time">{time}</span>
							<div class="dynamic-island">
								<div class="di-camera"></div>
								<span class="di-dot"></span>
							</div>
							<div class="sb-icons">
								<svg viewBox="0 0 17 12" fill="#1c1c1e"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="4.5" y="5.5" width="3" height="6.5" rx="1"/><rect x="9" y="3" width="3" height="9" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1" opacity=".35"/></svg>
								<svg viewBox="0 0 25 12"><rect x="0" y="1" width="22" height="10" rx="3" stroke="#1c1c1e" stroke-width="1.2" fill="none"/><rect x="22.5" y="3.5" width="2" height="5" rx="1" fill="#1c1c1e" opacity=".4"/><rect x="1.5" y="2.5" width="16.5" height="7" rx="2" fill="#1c1c1e"/></svg>
							</div>
						</div>
						{#each accounts as acc, i}
							<img
								src={acc.image}
								alt={acc.name}
								class="ph-img"
								class:active={i === current && !animating}
								class:enter-left={i === current && animating && slideDir === 'left'}
								class:enter-right={i === current && animating && slideDir === 'right'}
								class:exit-left={i === leaving && animating && slideDir === 'left'}
								class:exit-right={i === leaving && animating && slideDir === 'right'}
							/>
						{/each}
						<p class="sm-tagline">social media is your online extension</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		padding: var(--section-pad) 0;
		overflow: hidden;
	}

	/* ── Layout — mirrors WebPortfolio ── */
	.sm-layout {
		display: grid;
		grid-template-columns: minmax(320px, 30vw) 1fr;
		gap: 48px;
		align-items: start;
		min-height: 480px;
		padding-left: max(5%, calc((100vw - 1400px) / 2));
	}

	/* ── Left: Info ── */
	.sm-info {
		padding-right: 16px;
		position: sticky;
		top: 120px;
		align-self: start;
	}

	h2 {
		font-size: clamp(2rem, 3.5vw, 3rem);
		margin-bottom: 32px;
	}
	.accent { color: var(--color-accent); }

	.project-details {
		position: relative;
		min-height: 220px;
	}

	.project-text {
		position: absolute;
		top: 0; left: 0; right: 0;
		opacity: 0;
		transform: translateY(12px);
		transition: opacity 0.4s ease, transform 0.4s ease;
		pointer-events: none;
	}
	.project-text.active {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
		position: relative;
	}

	.project-num {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--color-accent);
		letter-spacing: 0.1em;
		display: block;
		margin-bottom: 12px;
	}

	.project-text h3 {
		font-size: clamp(1.6rem, 2.2vw, 2.2rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		margin-bottom: 4px;
	}

	.project-aka {
		font-size: 0.85rem;
		color: var(--color-text-dim);
		font-style: italic;
		margin-bottom: 14px;
	}

	.project-desc {
		font-size: 0.9rem;
		line-height: 1.7;
		margin-bottom: 18px;
	}

	.tech-pills { display: flex; flex-wrap: wrap; gap: 8px; }
	.pill {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-text-muted);
		border: 1px solid var(--color-border);
		padding: 5px 14px;
		border-radius: 999px;
		letter-spacing: 0.02em;
	}

	/* ── Nav controls ── */
	.nav-controls {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-top: 32px;
	}

	.nav-btn {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.25s ease;
	}
	.nav-btn:hover {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: #fff;
	}

	.nav-count {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-text-muted);
		letter-spacing: 0.08em;
		font-variant-numeric: tabular-nums;
	}

	/* ── Right: Phone visual ── */
	.sm-visual {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 40px;
		margin-left: -120px;
	}

	/* ── Phone — all sizes relative to --pw ── */
	.phone-wrap {
		--pw: 312px;
		position: relative;
		width: var(--pw);
	}

	.phone-outer {
		position: relative;
		width: 100%;
		aspect-ratio: 560 / 1300;
	}

	.phone-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.ph-screen {
		position: absolute;
		top: 15.8%;
		left: 10.4%;
		right: 9.8%;
		bottom: 9.5%;
		z-index: 1;
		background: #fff;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		border-radius: calc(var(--pw) * 0.108);
	}

	/* ── Status row ── */
	.status-row {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: calc(var(--pw) * 0.038) calc(var(--pw) * 0.038) calc(var(--pw) * 0.042);
		background: #f2f2f7;
		flex-shrink: 0;
		z-index: 5;
	}

	.dynamic-island {
		width: calc(var(--pw) * 0.26);
		height: calc(var(--pw) * 0.062);
		background: #1c1c1e;
		border-radius: calc(var(--pw) * 0.046);
		position: relative;
		flex-shrink: 0;
	}
	.di-camera {
		position: absolute;
		right: calc(var(--pw) * 0.03);
		top: 50%;
		transform: translateY(-50%);
		width: calc(var(--pw) * 0.019);
		height: calc(var(--pw) * 0.019);
		border-radius: 50%;
		background: #0a3d6b;
		box-shadow: inset 0 0 1px 0.5px rgba(255,255,255,.15);
	}
	.di-dot {
		position: absolute;
		right: calc(var(--pw) * -0.035);
		top: 50%;
		transform: translateY(-50%);
		width: calc(var(--pw) * 0.019);
		height: calc(var(--pw) * 0.019);
		border-radius: 50%;
		background: #ff9500;
		animation: blink 1.5s ease-in-out infinite;
	}
	@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }

	.sb-time {
		font-size: calc(var(--pw) * 0.035);
		font-weight: 700;
		color: #000;
		letter-spacing: .02em;
		font-variant-numeric: tabular-nums;
		padding-left: calc(var(--pw) * 0.015);
	}

	.sb-icons {
		display: flex;
		align-items: center;
		gap: calc(var(--pw) * 0.008);
		justify-self: end;
		padding-right: calc(var(--pw) * 0.008);
	}
	.sb-icons svg {
		width: calc(var(--pw) * 0.05);
		height: calc(var(--pw) * 0.03);
	}

	/* ── Images ── */
	.ph-img {
		position: absolute;
		top: calc(8% + 5px);
		left: 0;
		width: 100%;
		height: calc(86% - 10px);
		object-fit: contain;
		object-position: top center;
		opacity: 0;
		transform: translateX(100%);
		transition: transform .35s cubic-bezier(0.25,0.1,0.25,1);
		will-change: transform;
	}
	.ph-img.active      { opacity: 1; transform: translateX(0); }
	/* Entering: starts off-screen, slides into view */
	.ph-img.enter-left  { opacity: 1; transform: translateX(0); animation: slideFromRight .35s cubic-bezier(0.25,0.1,0.25,1) forwards; }
	.ph-img.enter-right { opacity: 1; transform: translateX(0); animation: slideFromLeft .35s cubic-bezier(0.25,0.1,0.25,1) forwards; }
	/* Leaving: slides out */
	.ph-img.exit-left   { opacity: 1; animation: slideOutLeft .35s cubic-bezier(0.25,0.1,0.25,1) forwards; }
	.ph-img.exit-right  { opacity: 1; animation: slideOutRight .35s cubic-bezier(0.25,0.1,0.25,1) forwards; }

	@keyframes slideFromRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
	@keyframes slideFromLeft  { from { transform: translateX(-100%); } to { transform: translateX(0); } }
	@keyframes slideOutLeft   { from { transform: translateX(0); } to { transform: translateX(-100%); } }
	@keyframes slideOutRight  { from { transform: translateX(0); } to { transform: translateX(100%); } }

	/* ── Floating cards ── */
	.fc {
		position: absolute;
		z-index: 5;
		display: flex;
		flex-direction: column;
		gap: .85rem;
		background: rgba(20,20,22,.9);
		border: 1px solid rgba(255,255,255,.08);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		padding: 1.3rem 1.4rem;
		border-radius: 18px;
		box-shadow: 0 16px 40px rgba(0,0,0,.5), 0 2px 8px rgba(0,0,0,.2);
	}
	.fc-top { top: 12%; right: -50%; animation: bob1 4s ease-in-out infinite; width: 220px; }
	.fc-bot { bottom: 18%; left: -35%; animation: bob2 5s ease-in-out infinite; }

	.fc-header {
		display: flex;
		align-items: center;
		gap: .6rem;
	}

	.fc-icon {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.fc-name { font-size: .95rem; color: #fff; font-weight: 700; line-height: 1.3; }
	.fc-sub { font-size: .7rem; color: rgba(255,255,255,.4); font-weight: 500; }

	/* Stats row */
	.fc-stats {
		display: flex;
		align-items: center;
		gap: .6rem;
	}
	.fc-stat { display: flex; flex-direction: column; align-items: center; min-width: 36px; }
	/* Horizontal roller (1x → 2x → 3x) */
	.roller-h {
		overflow: hidden;
		width: 2.2ch;
		height: 18px;
		mask-image: linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%);
		-webkit-mask-image: linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%);
	}
	.roller-h-track {
		display: flex;
		transition: transform .45s cubic-bezier(0.4,0,0.2,1);
	}
	.roller-h-track .fc-stat-val {
		flex: 0 0 2.2ch;
		height: 18px;
		line-height: 18px;
	}

	/* Vertical roller (posts, reach) */
	.roller-v {
		overflow: hidden;
		width: 4.5ch;
		height: 18px;
	}
	.roller-v-track {
		display: flex;
		flex-direction: column;
		transition: transform .45s cubic-bezier(0.4,0,0.2,1);
	}
	.roller-v-track .fc-stat-val {
		height: 18px;
		line-height: 18px;
	}

	.fc-stat-val {
		font-size: .9rem;
		font-weight: 800;
		color: #fff;
		font-variant-numeric: tabular-nums;
		text-align: center;
		white-space: nowrap;
	}
	.fc-stat-lbl { font-size: .55rem; color: rgba(255,255,255,.35); font-weight: 500; text-transform: uppercase; letter-spacing: .04em; }
	.fc-stat-sep { width: 1px; height: 22px; background: rgba(255,255,255,.1); }

	/* Tags */
	.fc-tag-roller {
		overflow: hidden;
		height: 50px;
		padding-top: 8px;
		mask-image: linear-gradient(to bottom, transparent 0%, white 25%, white 80%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, transparent 0%, white 25%, white 80%, transparent 100%);
	}
	.fc-tag-track {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 14px;
		animation: tagRoll 6s cubic-bezier(0.4,0,0.2,1) infinite;
	}
	.fc-tag {
		font-size: .8rem;
		font-weight: 700;
		padding: 6px 16px;
		border-radius: 10px;
		letter-spacing: .03em;
		height: 34px;
		line-height: 22px;
		display: inline-flex;
		align-items: center;
		width: fit-content;
	}

	/* Color variants */
	.fc-tag-pink  { color: #f472b6; background: rgba(244,114,182,.12); box-shadow: 0 0 12px rgba(244,114,182,.2); border: 1px solid rgba(244,114,182,.2); }
	.fc-tag-blue  { color: #60a5fa; background: rgba(96,165,250,.12);  box-shadow: 0 0 12px rgba(96,165,250,.2);  border: 1px solid rgba(96,165,250,.2); }
	.fc-tag-green { color: #34d399; background: rgba(52,211,153,.12);  box-shadow: 0 0 12px rgba(52,211,153,.2);  border: 1px solid rgba(52,211,153,.2); }
	.fc-tag-amber { color: #fbbf24; background: rgba(251,191,36,.12);  box-shadow: 0 0 12px rgba(251,191,36,.2);  border: 1px solid rgba(251,191,36,.2); }

	@keyframes tagRoll {
		0%,18%   { transform: translateY(0); }
		25%,43%  { transform: translateY(-48px); }
		50%,68%  { transform: translateY(-96px); }
		75%,93%  { transform: translateY(-144px); }
		100%     { transform: translateY(0); }
	}

	@keyframes bob1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
	@keyframes bob2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }

	/* ── Floating reactions ── */
	.reaction {
		position: absolute;
		z-index: 3;
		color: rgba(255,255,255,.25);
		opacity: 0;
		pointer-events: none;
		animation: floatUp 4s ease-out infinite;
	}
	.reaction svg { display: block; }
	.r1 { bottom: 30%; right: -12%; animation-delay: 0s; }
	.r1 svg { width: 22px; height: 22px; }
	.r2 { bottom: 50%; right: -18%; animation-delay: 1.2s; }
	.r2 svg { width: 16px; height: 16px; }
	.r3 { bottom: 35%; left: -14%;  animation-delay: 2.4s; }
	.r3 svg { width: 18px; height: 18px; }
	.r4 { bottom: 20%; right: -8%;  animation-delay: 0.6s; }
	.r4 svg { width: 14px; height: 14px; }
	.r5 { bottom: 55%; left: -16%;  animation-delay: 1.8s; }
	.r5 svg { width: 20px; height: 20px; }
	.r6 { bottom: 42%; left: -10%;  animation-delay: 3.2s; }
	.r6 svg { width: 15px; height: 15px; }
	.r7 { bottom: 65%; right: -15%; animation-delay: 2.8s; }
	.r7 svg { width: 13px; height: 13px; }

	@keyframes floatUp {
		0%   { opacity: 0; transform: translate(0, 0) scale(0.5) rotate(0deg); }
		15%  { opacity: .15; transform: translate(8px, -20px) scale(1) rotate(10deg); }
		40%  { opacity: .12; transform: translate(-12px, -50px) scale(0.95) rotate(-8deg); }
		65%  { opacity: .08; transform: translate(10px, -85px) scale(0.9) rotate(12deg); }
		100% { opacity: 0; transform: translate(-6px, -120px) scale(0.8) rotate(-5deg); }
	}

	/* ── Engagement bubbles ── */
	.engage-bubble {
		position: absolute;
		z-index: 8;
		font-size: .75rem;
		font-weight: 600;
		color: rgba(255,255,255,.9);
		background: rgba(20,20,22,.75);
		border: 1px solid rgba(255,255,255,.12);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		padding: 6px 14px;
		border-radius: 20px;
		white-space: nowrap;
		pointer-events: none;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		opacity: 0;
		animation: bubbleDrift 5s ease-in-out infinite;
	}
	.engage-bubble svg { flex-shrink: 0; }
	.eb1 { top: 40%;   right: -22%; animation-delay: 0s; }
	.eb2 { top: 55%;   left: -25%;  animation-delay: 2s; }
	.eb3 { top: 5%;    right: -20%; animation-delay: 4s; }
	.eb4 { top: 65%;   right: -18%; animation-delay: 1s; }
	.eb5 { top: 50%;   left: -20%;  animation-delay: 3s; }

	@keyframes bubbleDrift {
		0%   { opacity: 0; transform: translate(0, 10px) scale(0.85); }
		12%  { opacity: 1; transform: translate(4px, 0) scale(1); }
		50%  { opacity: .85; transform: translate(-3px, -4px) scale(1); }
		75%  { opacity: .7; transform: translate(2px, -8px) scale(1); }
		100% { opacity: 0; transform: translate(-2px, -14px) scale(0.9); }
	}

	/* ── Tagline ── */
	.sm-tagline {
		position: absolute;
		bottom: 5px; left: 0; right: 0;
		padding: 2% 0;
		text-align: center;
		font-size: calc(var(--pw) * 0.031);
		color: rgba(0,0,0,.3);
		font-style: italic;
		letter-spacing: .03em;
		z-index: 4;
		margin: 0;
	}

	/* ── Responsive ── */
	@media (max-width: 900px) {
		.sm-layout {
			grid-template-columns: 1fr;
			gap: 32px;
			padding-left: 0;
		}
		.sm-info {
			position: static;
			padding-left: 5%;
			padding-right: 5%;
		}
		.project-details { min-height: 200px; }
		.sm-visual { padding-top: 0; }
		.fc-top { right: -40%; }
		.fc-bot { left: -25%; }
	}
	@media (max-width: 480px) {
		.sm-visual { margin-left: 0; }
		.phone-wrap { --pw: 340px; }
		.fc { transform: scale(0.65); }
		.fc-top { right: calc(-12% + 5px); top: calc(2% - 5px); transform-origin: top right; }
		.fc-bot { left: -5%; bottom: -5%; transform-origin: bottom left; }
		.engage-bubble { transform: scale(0.85); }
		.eb1 { top: 35%; right: -5%; }
		.eb2 { top: 55%; left: -8%; }
		.eb3 { top: 2%;  right: -3%; }
		.eb4 { top: 72%; right: -5%; }
		.eb5 { top: 48%; left: -5%; }
		.reaction { display: none; }
	}
</style>
