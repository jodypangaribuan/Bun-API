console.log("--- STARTING BUN APP ---");

// Heartbeat to prove the process is alive
setInterval(() => {
    console.log(`[${new Date().toISOString()}] Heartbeat: Process is still alive`);
}, 10000);

const server = Bun.serve({
    port: 33005,
    hostname: "0.0.0.0",
    fetch(request) {
        const url = new URL(request.url);
        console.log(`>>> [${new Date().toISOString()}] ${request.method} ${url.pathname}`);

        try {
            if (url.pathname === "/") return new Response("Bun is Active 🚀\n");
            if (url.pathname === "/api/health") {
                return new Response(JSON.stringify({ status: "ok", port: 33002 }), {
                    headers: { "Content-Type": "application/json" },
                });
            }
            return new Response("Not Found", { status: 404 });
        } catch (err) {
            console.error("!!! Error:", err);
            return new Response("Error", { status: 500 });
        }
    },
});

console.log(`--- SERVER READY: Listening internally on ${server.port} ---`);