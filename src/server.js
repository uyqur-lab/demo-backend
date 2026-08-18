import { createServer } from 'node:http';

/** Kontrakt: GET /api/hello → 200 { "message": "Hello, Uyqur!" } */
export function handle(url) {
  if (url === '/api/hello') {
    return { status: 200, body: { message: 'Hello, Uyqur!' } };
  }
  return { status: 404, body: { error: 'not_found' } };
}

export function createApp() {
  return createServer((req, res) => {
    const { status, body } = handle(req.url);
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  });
}

if (process.argv[1]?.endsWith('server.js')) {
  createApp().listen(3000, () => console.log('http://localhost:3000'));
}
