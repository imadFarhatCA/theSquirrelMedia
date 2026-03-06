export async function onRequestPost({ request, env }) {
	try {
		const body = await request.json();
		const { subject, from_name, replyto, message } = body;

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: `${from_name} <onboarding@resend.dev>`,
				to:   ['imad.farhat@hotmail.com'],
				reply_to: replyto,
				subject,
				html: message,
			}),
		});

		const data = await res.json();
		if (data.id) {
			return Response.json({ success: true });
		}
		return Response.json({ success: false, message: data.message || 'Send failed' }, { status: 400 });
	} catch (e) {
		return Response.json({ success: false, message: e.message }, { status: 500 });
	}
}
