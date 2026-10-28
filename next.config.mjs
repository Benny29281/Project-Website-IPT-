import { withPayload } from '@payloadcms/next/withPayload';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withPayload(withNextIntl({ poweredByHeader: false, turbopack: {root: path.dirname(fileURLToPath(import.meta.url))} }));
