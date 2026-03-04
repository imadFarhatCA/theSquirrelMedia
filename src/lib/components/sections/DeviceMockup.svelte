<script>
	/**
	 * @type {{ desktopImage?: string, mobileImage?: string, scrollDuration?: number, color?: string }}
	 */
	let {
		desktopImage = '',
		mobileImage = '',
		scrollDuration = 20,
		color = '#a855f7'
	} = $props();
</script>

<div class="stacked-screens">
	<!-- Desktop -->
	<div class="desktop-frame">
		<div class="desktop-viewport">
			{#if desktopImage}
				<img src={desktopImage} alt="Desktop preview" style="animation-duration: {scrollDuration}s" />
			{:else}
				<div class="placeholder" style="--ph-color: {color}">
					<span>Desktop Preview</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Mobile -->
	<div class="mobile-frame">
		<div class="mobile-viewport">
			{#if mobileImage}
				<img src={mobileImage} alt="Mobile preview" style="animation-duration: {scrollDuration + 4}s" />
			{:else}
				<div class="placeholder mobile" style="--ph-color: {color}">
					<span>Mobile</span>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.stacked-screens {
		position: relative;
	}

	/* ── Desktop ───────────────────────────── */
	.desktop-frame {
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
	}

	.desktop-viewport {
		width: 100%;
		aspect-ratio: 16 / 13;
		overflow: hidden;
		position: relative;
		background: #111;
	}

	.desktop-viewport img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
	}

	/* ── Mobile ─────────────────────────────── */
	.mobile-frame {
		position: absolute;
		right: -20px;
		bottom: -28px;
		width: 22%;
		min-width: 100px;
		max-width: 150px;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
		z-index: 2;
	}

	.mobile-viewport {
		width: 100%;
		aspect-ratio: 9 / 19.5;
		overflow: hidden;
		position: relative;
		background: #111;
	}

	.mobile-viewport img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
		display: block;
	}

	/* ── Placeholder ───────────────────────── */
	.placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(160deg, var(--ph-color), rgba(168, 85, 247, 0.2));
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.placeholder span {
		font-family: var(--font);
		font-size: 14px;
		color: rgba(255, 255, 255, 0.4);
		font-weight: 600;
	}
	.placeholder.mobile { height: 100%; }

	/* ── Responsive ────────────────────────── */
	@media (max-width: 768px) {
		.mobile-frame {
			width: 25%;
			right: -12px;
			bottom: -20px;
		}
	}
</style>
