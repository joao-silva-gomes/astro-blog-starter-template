import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
	const response = await next();

	if (
		context.url.pathname.startsWith("/_astro/") &&
		response.status === 404
	) {
		const headers = new Headers(response.headers);

		headers.set(
			"Cache-Control",
			"public, max-age=31536000, immutable",
		);
		headers.set("X-Repro-404", "true");

		return new Response(response.body, {
			status: 404,
			headers,
		});
	}

	return response;
});