const server = Bun.serve({
    port: 3000,
    hostname: "0.0.0.0",
    fetch(request) {
        const url = new URL(request.url);
        console.log(`[${new Date().toISOString()}] Request: ${request.method} ${url.pathname}`);

        return new Response(JSON.stringify({
            status: "alive",
            message: "Bun is finally talking!",
            time: new Date().toISOString()
        }), {
            headers: { "Content-Type": "application/json" },
        });
    },
});

console.log(`Bun listening internally on ${server.port}`);