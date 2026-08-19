import { createServer } from 'node:http';

/**
 * So'rov tanasini xavfsiz o'qiydi.
 *
 * Uch xil "yomon" tana bir-biridan ajratiladi, chunki AC'lar ularga
 * boshqacha munosabatda:
 *   - tana yo'q                            → {} kabi qaraladi (name_required)
 *   - buzilgan JSON                        → invalid_body
 *   - JSON, lekin obyekt emas ("matn", 42) → invalid_body
 */
function parseBody(raw) {
  if (raw === null || raw === undefined || raw === '') {
    return { ok: true, value: {} };
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false };
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ok: false };
  }
  return { ok: true, value: parsed };
}

function corsHeaders() {
  return {
    // Brauzerdagi frontend boshqa portdan so'raydi.
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
}

/**
 * Kontrakt:
 *   POST /api/v1/hi  { "name": "Alisher" } → 200 { "message": "hi Alisher" }
 *                    { "name": "" }        → 200 { "message": "hi " }
 *                    { } yoki name: null   → 400 { "error": "name_required" }
 *                    buzilgan JSON         → 400 { "error": "invalid_body" }
 *   *                                      → 404 { "error": "not_found" }
 */
/**
 * Tasodifiy hex rang kodi.
 *
 * `padStart` majburiy: `toString(16)` boshidagi nollarni tushirib qoldiradi,
 * ya'ni `0x00ff2a` → `"ff2a"` bo'lib qolardi. Xato faqat ba'zan chiqadi —
 * shuning uchun test 200 marta chaqiradi.
 */
function randomHexColor() {
  return Math.floor(Math.random() * 0x1000000)
    .toString(16)
    .padStart(6, '0');
}

export function handle(url, method = 'GET', body = null) {
  if (url === '/api/v1/color' && method === 'GET') {
    // Format kontraktda muzlatilgan: 6 belgi, kichik harf, `#` yo'q.
    // Klientlar bu matnni o'zgartirmasdan ko'rsatadi (doc.md, PM qarori 1).
    return { status: 200, body: { color: randomHexColor() } };
  }

  if (url === '/api/v1/hi' && method === 'POST') {
    const parsed = parseBody(body);
    if (!parsed.ok) {
      return { status: 400, body: { error: 'invalid_body' } };
    }

    const { name } = parsed.value;

    // Bo'sh matn to'g'ri qiymat, `null` va yo'qlik esa emas (AC-2 va AC-3).
    // `!name` bilan tekshirish bo'sh matnni ham rad etib, AC-2 ni buzardi.
    if (typeof name !== 'string') {
      return { status: 400, body: { error: 'name_required' } };
    }

    // Javob har doim shu formula bilan quriladi — bo'sh ism uchun "hi ".
    return { status: 200, body: { message: `hi ${name}` } };
  }

  return { status: 404, body: { error: 'not_found' } };
}

export function createApp() {
  return createServer((req, res) => {
    // Brauzer POST'dan oldin preflight yuboradi.
    if (req.method === 'OPTIONS') {
      res.writeHead(204, corsHeaders());
      res.end();
      return;
    }

    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', () => {
      const { status, body } = handle(req.url, req.method, raw || null);
      res.writeHead(status, {
        'Content-Type': 'application/json',
        ...corsHeaders(),
      });
      res.end(JSON.stringify(body));
    });
  });
}

if (process.argv[1]?.endsWith('server.js')) {
  createApp().listen(3000, () => console.log('http://localhost:3000'));
}
