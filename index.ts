console.log("Starting Bun server...");

const server = Bun.serve({
    port: 3000,
    hostname: "0.0.0.0",
    fetch(request) {
        const url = new URL(request.url);
        console.log(`>>> [${new Date().toISOString()}] ${request.method} ${url.pathname}${url.search}`);

        try {
            // Simple routing
            if (url.pathname === "/") {
                return new Response("Welcome to the Bun API! 🚀\n");
            }

            if (url.pathname === "/api/health") {
                return new Response(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }), {
                    headers: { "Content-Type": "application/json" },
                });
            }

            if (url.pathname === "/api/hello") {
                const name = url.searchParams.get("name") || "World";
                return new Response(JSON.stringify({ message: `Hello, ${name}!` }), {
                    headers: { "Content-Type": "application/json" },
                });
            }

            return new Response("Not Found", { status: 404 });
        } catch (err) {
            console.error("!!! ERROR handling request:", err);
            return new Response("Internal Error", { status: 500 });
        }
    },
    error(error) {
        console.error("!!! BUN SERVER ERROR:", error);
        return new Response("Server Error", { status: 500 });
    },
});

console.log(`Bun API is listening internally on ${server.hostname}:${server.port}`);