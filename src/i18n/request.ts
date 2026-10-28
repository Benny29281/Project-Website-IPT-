import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';
export default getRequestConfig(async () => ({locale: (await headers()).get('x-site-locale') || 'id', messages: {}, timeZone: 'Asia/Jakarta'}));
