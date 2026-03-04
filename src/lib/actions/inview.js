export function inview(node, { threshold = 0.15, delay = 0 } = {}) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				setTimeout(() => node.classList.add('visible'), delay);
				observer.unobserve(node);
			}
		},
		{ threshold }
	);
	observer.observe(node);
	return { destroy() { observer.unobserve(node); } };
}
