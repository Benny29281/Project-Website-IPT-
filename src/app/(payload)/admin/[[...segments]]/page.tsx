import config from '@payload-config';
import {RootPage} from '@payloadcms/next/views';
import {importMap} from '../importMap';
export const dynamic = 'force-dynamic';
export default function Page({params, searchParams}: {params: Promise<{segments: string[]}>; searchParams: Promise<{[key: string]: string | string[]}>}) {return RootPage({config, importMap, params, searchParams});}
