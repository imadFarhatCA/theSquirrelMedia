export function inview(node, { threshold = 0.05, delay = 0 } = {}) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.classList.add('visible');
		return {};
	}

	const rect = node.getBoundingClientRect();
	const alreadyVisible =
		rect.top < window.innerHeight &&
		rect.bottom > 0 &&
		rect.left < window.innerWidth &&
		rect.right > 0;

	if (alreadyVisible) {
		// Already in viewport on load/refresh — skip animation entirely
		node.classList.add('inview-ready', 'visible');
		return {};
	}

	// Not yet in viewport — arm the animation
	node.classList.add('inview-ready');

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				setTimeout(() => node.classList.add('visible'), delay);
				observer.disconnect();
			}
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
