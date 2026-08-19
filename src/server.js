import { createServer } from 'node:http';

/**
 * Marshrutlash. Hozircha hech qanday yo'l ro'yxatga olinmagan.
 *
 * Kontrakt:
 *   * → 404 { "error": "not_found" }
 */
export function handle(url, method = 'GET', body = null) {
  return { status: 404, body: { error: 'not_found' } };
}

export function createApp() {
  return createServer((req, res) => {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', () => {
      const { status, body } = handle(req.url, req.method, raw || null);
      res.writeHead(status, {
        'Content-Type': 'application/json',
        // Brauzerdagi frontend boshqa portdan so'raydi.
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      });
      res.end(JSON.stringify(body));
    });
  });
}

if (process.argv[1]?.endsWith('server.js')) {
  createApp().listen(3000, () => console.log('http://localhost:3000'));
}
