import {PolicyPlaceholder,policyMetadata} from '@/components/policy-placeholder';
import type {SiteLocale} from '@/lib/locales';
type Props={params:Promise<{locale:SiteLocale}>};
export function generateMetadata({params}:Props) {return policyMetadata(params,'terms')}
export default function Page({params}:Props) {return <PolicyPlaceholder params={params} policy="terms"/>}
