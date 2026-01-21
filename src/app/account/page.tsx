'use client'
import AccountFeatureIndex from '@/features/account/account-feature-index'

// Disable static generation for this page
export const dynamic = 'force-dynamic'

export default function Page() {
  return <AccountFeatureIndex />
}
