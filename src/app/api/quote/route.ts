import {NextResponse, type NextRequest} from 'next/server';
import {getPayload} from 'payload';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  const en = request.headers.get('accept-language')?.startsWith('en');
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin && origin !== process.env.NEXT_PUBLIC_SITE_URL) return NextResponse.json({error: 'Invalid origin'}, {status: 403});
  if (Number(request.headers.get('content-length') || 0) > 16000) return NextResponse.json({error: 'Request too large'}, {status: 413});
  let data: Record<string, unknown>;
  try {const raw = await request.text(); if (raw.length > 16000) return NextResponse.json({error: 'Request too large'}, {status: 413}); data = JSON.parse(raw); if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error();} catch {return NextResponse.json({error: 'Invalid request'}, {status: 400});}
  if (data.website) return NextResponse.json({ok: true});
  const fields = ['name','company','email','phone','country','product','volume','destination','incoterm','message','locale'];
  const clean = Object.fromEntries(fields.map(key => [key, typeof data[key] === 'string' ? data[key].trim() : '']));
  if (!clean.name || clean.name.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) || clean.email.length > 200 || clean.message.length < 10 || clean.message.length > 5000 || data.consent !== 'on' || fields.filter(x => x !== 'message').some(x => clean[x].length > 200)) return NextResponse.json({error: clean.locale === 'en' ? 'Check your name, email, message, and privacy consent.' : 'Periksa nama, email, pesan, dan persetujuan privasi Anda.'}, {status: 400});
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) return NextResponse.json({error: clean.locale === 'en' ? 'This preview is not connected to a database yet. Your request has not been sent.' : 'Pratinjau belum terhubung ke basis data. Permintaan Anda belum terkirim.'}, {status: 503});
  try {
    const {default: config} = await import('@payload-config'); const payload = await getPayload({config});
    await payload.create({collection: 'inquiries', data: {...clean, consent: true, status: 'new'}, overrideAccess: true});
    return NextResponse.json({ok: true});
  } catch {return NextResponse.json({error: en ? 'Unable to save your request. Please try again later.' : 'Permintaan belum dapat disimpan. Silakan coba kembali.'}, {status: 503});}
}
