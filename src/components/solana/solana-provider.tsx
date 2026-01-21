'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createSolanaDevnet, createSolanaLocalnet, createWalletUiConfig, WalletUi } from '@wallet-ui/react'
import { WalletUiGillProvider } from '@wallet-ui/react-gill'
import { solanaMobileWalletAdapter } from './solana-mobile-wallet-adapter'

const config = createWalletUiConfig({
  clusters: [createSolanaDevnet(), createSolanaLocalnet()],
})

// Only initialize mobile wallet adapter on client side
if (typeof window !== 'undefined') {
  solanaMobileWalletAdapter({ clusters: config.clusters })
}

export function SolanaProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render wallet provider during SSR
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <WalletUi config={config}>
      <WalletUiGillProvider>{children}</WalletUiGillProvider>
    </WalletUi>
  )
}
