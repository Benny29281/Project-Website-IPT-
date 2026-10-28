import {NextRequest,NextResponse} from 'next/server';
export async function readCheckoutBody(request: Request): Promise<Record<string,unknown>> {
  const reader=request.body?.getReader();if (!reader) throw new Error('empty');let size=0;let raw='';const decoder=new TextDecoder();
  try {while (true) {const chunk=await reader.read();if (chunk.done) break;size+=chunk.value.byteLength;if (size>20000) {await reader.cancel();throw new Error('size');}raw+=decoder.decode(chunk.value,{stream:true});}raw+=decoder.decode();} finally {reader.releaseLock();}
  const data=JSON.parse(raw);if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('invalid');return data;
}
export function validCheckoutOrigin(request: NextRequest) {const origin=request.headers.get('origin');return !origin || origin === new URL(request.url).origin || origin === process.env.NEXT_PUBLIC_SITE_URL;}
const attempts = new Map<string,{count:number;expires:number}>();
export function checkoutRateLimit(request: NextRequest) {
  const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';const now=Date.now();
  for (const [key,value] of attempts) if (value.expires<now) attempts.delete(key);
  const record=attempts.get(ip) || {count:0,expires:now+60000};record.count++;if (attempts.size>1000 && !attempts.has(ip)) return false;attempts.set(ip,record);return record.count<=10;
}
export function checkoutError(message: string,status: number) {return NextResponse.json({error:message},{status,headers:{'Cache-Control':'no-store'}});}
