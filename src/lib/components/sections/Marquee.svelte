<script>
	const words = ['Web Design', 'Branding', 'UI/UX', 'Digital Strategy', 'Typography', 'Graphics', 'HTML/CSS', 'Identity', 'Marketing', 'Creative'];
	const track = [...words, ...words];
</script>

<div class="marquee">
	<div class="marquee-track">
		{#each track as word}
			<span class="marquee-word">{word}</span>
			<span class="marquee-dot">&middot;</span>
		{/each}
	</div>
</div>

<style>
	.marquee {
		overflow: hidden;
		padding: 40px 0;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
	}

	.marquee-track {
		display: flex;
		gap: 0;
		white-space: nowrap;
		animation: scroll 30s linear infinite;
		width: max-content;
	}

	.marquee-word {
		font-size: clamp(1.8rem, 4vw, 3.5rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: transparent;
		-webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
		padding: 0 20px;
		text-transform: uppercase;
		transition: color 0.3s ease, -webkit-text-stroke 0.3s ease;
	}

	.marquee-word:hover {
		color: var(--color-accent);
		-webkit-text-stroke: 1px var(--color-accent);
	}

	.marquee-dot {
		font-size: clamp(1.8rem, 4vw, 3.5rem);
		color: rgba(255, 255, 255, 0.08);
		padding: 0 10px;
		font-weight: 300;
	}

	@keyframes scroll {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}
</style>
