'use client'

import { useSolana } from '@/components/solana/use-solana'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export function NetworkMismatchWarning() {
  const { cluster } = useSolana()

  return (
    <Alert className="mb-4 bg-yellow-50 border-yellow-200">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-800">Network Configuration</AlertTitle>
      <AlertDescription className="text-yellow-700">
        <p className="mb-2">
          The app is currently connected to: <strong>{cluster.label}</strong>
        </p>
        <p className="mb-2">
          ⚠️ Make sure your wallet is also on <strong>{cluster.label}</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Open your Brave wallet</li>
          <li>Click the network dropdown (top of wallet)</li>
          <li>Select <strong>{cluster.label}</strong></li>
          <li>Disconnect and reconnect your wallet in this app</li>
        </ol>
      </AlertDescription>
    </Alert>
  )
}
