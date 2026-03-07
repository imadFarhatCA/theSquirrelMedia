<script>
	/** @type {{ name: string, price: string, currency: string, period?: string, stars: number, features: {bold: string, text: string}[], highlight?: boolean }} */
	let { name, price, currency, period = '', stars, features, highlight = false } = $props();
</script>

<div class="card" class:highlight>
	{#if highlight}
		<div class="popular-badge">Most Popular</div>
	{/if}
	<div class="card-header">
		<div class="stars">
			{#each Array(stars) as _}
				<svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
					<path d="M6 1l1.5 3 3.2.5-2.35 2.25.55 3.25L6 8.5l-2.9 1.5.55-3.25L1.3 4.5 4.5 4z"/>
				</svg>
			{/each}
		</div>
		<span class="pkg-name">{name}</span>
	</div>

	<div class="price-row">
		<span class="price">{price}</span>
		<span class="currency-block">
			<span class="currency">{currency}</span>
			{#if period}<span class="period">{period}</span>{/if}
		</span>
	</div>

	<ul class="features">
		{#each features as f}
			<li><strong>{f.bold}</strong>{f.text}</li>
		{/each}
	</ul>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 28px 24px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 18px;
		transition: border-color 0.25s ease;
	}
	.card:hover { border-color: rgba(168, 85, 247, 0.3); }

	.card.highlight {
		border-color: rgba(168, 85, 247, 0.6);
		background: linear-gradient(160deg, rgba(168,85,247,0.1) 0%, var(--color-surface) 70%);
		box-shadow: 0 0 40px rgba(168, 85, 247, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.2);
	}

	.popular-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		align-self: flex-start;
		padding: 4px 12px;
		border-radius: 999px;
		background: rgba(168, 85, 247, 0.15);
		border: 1px solid rgba(168, 85, 247, 0.35);
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.stars {
		display: flex;
		gap: 3px;
		color: var(--color-accent);
	}

	.pkg-name {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.price-row {
		display: flex;
		align-items: baseline;
		gap: 8px;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--color-border);
	}

	.price {
		font-size: 2.4rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		color: var(--color-text);
		line-height: 1;
	}

	.currency-block {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.currency {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-accent);
		letter-spacing: 0.06em;
	}

	.period {
		font-size: 0.68rem;
		color: var(--color-text-dim);
		letter-spacing: 0.04em;
	}

	.features {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex: 1;
	}

	.features li {
		font-size: 0.82rem;
		color: var(--color-text-muted);
		line-height: 1.55;
		padding-left: 14px;
		position: relative;
	}

	.features li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: var(--color-text-dim);
		font-size: 0.7rem;
	}

	.features strong {
		color: var(--color-text);
		font-weight: 600;
	}
</style>
