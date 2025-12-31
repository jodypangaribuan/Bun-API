const server = Bun.serve({
    port: 3000,
    hostname: "0.0.0.0",
    fetch(request) {
        const url = new URL(request.url);
        console.log(`[${new Date().toISOString()}] Request: ${request.method} ${url.pathname}`);

        // Using a very standard text response to bypass any deep-packet inspection
        return new Response("Bun is Active on Port 8000! 🚀\n", {
            headers: { "Content-Type": "text/plain" },
        });
    },
});

console.log(`Bun listening internally on ${server.port}`);