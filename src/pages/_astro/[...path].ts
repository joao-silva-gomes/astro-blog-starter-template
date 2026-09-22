import type { APIRoute } from "astro";

export const prerender = false;

const notFound: APIRoute = () =>
	new Response("Reproduction 404", {
		status: 404,
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"X-Repro-404": "true",
		},
	});

export const GET = notFound;
export const HEAD = notFound;