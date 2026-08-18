import { createServer } from 'node:http';

/** Server sog'ligini tekshiradi. Real loyihada DB/queue tekshiruvi bo'ladi. */
export function checkHealth() {
  return { ok: true };
}

/**
 * Kontrakt:
 *   GET /api/hello  → 200 { "message": "Hello, Uyqur!" }
 *   GET /api/status → 200 { "status": "ok" } | 503 { "status": "down" }
 *   GET /*          → 404 { "error": "not_found" }
 */
export function handle(url, health = checkHealth) {
  if (url === '/api/hello') {
    return { status: 200, body: { message: 'Hello, Uyqur!' } };
  }

  if (url === '/api/status') {
    try {
      return health().ok
        ? { status: 200, body: { status: 'ok' } }
        : { status: 503, body: { status: 'down' } };
    } catch {
      // Tekshiruvning o'zi yiqilsa ham javob kontraktga mos qaytadi.
      return { status: 503, body: { status: 'down' } };
    }
  }

  return { status: 404, body: { error: 'not_found' } };
}

export function createApp() {
  return createServer((req, res) => {
    const { status, body } = handle(req.url);
    res.writeHead(status, {
      'Content-Type': 'application/json',
      // Brauzerdagi frontend boshqa portdan so'raydi.
      'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify(body));
  });
}

if (process.argv[1]?.endsWith('server.js')) {
  createApp().listen(3000, () => console.log('http://localhost:3000'));
}
