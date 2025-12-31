const server = Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);
    
    // Simple routing
    if (url.pathname === "/") {
      return new Response("Welcome to the Bun API! 🚀");
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
  },
});

console.log(`Bun API is running at http://localhost:${server.port}`);