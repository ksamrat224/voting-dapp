import { useSolana } from '@/components/solana/use-solana'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { getInitializePollInstructionAsync } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'
import { createTransaction, getBase58Decoder, signAndSendTransactionMessageWithSigners } from 'gill'

export function useVotingInitializePollMutation({ account }: { account: UiWalletAccount }) {
  const { cluster, client } = useSolana()
  const queryClient = useQueryClient()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async ({
      pollId,
      description,
      pollStart,
      pollEnd,
    }: {
      pollId: bigint
      description: string
      pollStart: bigint
      pollEnd: bigint
    }) => {
      try {
        // Get the latest blockhash
        const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()

        // Create the instruction
        const instruction = await getInitializePollInstructionAsync({
          signer,
          pollId,
          description,
          pollStart,
          pollEnd,
        })

        // Create a transaction with the instruction
        const transaction = createTransaction({
          feePayer: signer,
          version: 0,
          latestBlockhash,
          instructions: [instruction],
        })

        // Sign and send the transaction
        const signatureBytes = await signAndSendTransactionMessageWithSigners(transaction)
        const signature = getBase58Decoder().decode(signatureBytes)

        console.log('Poll created with signature:', signature)
        return signature
      } catch (err: any) {
        console.error('Transaction failed:')
        console.error('Error name:', err?.name)
        console.error('Error message:', err?.message)
        console.error('Error cause:', err?.cause)
        console.error('Error stack:', err?.stack)
        console.error('Full error (stringify):', JSON.stringify(err, Object.getOwnPropertyNames(err || {}), 2))
        
        // If it's a Solana RPC error, it might have logs
        if (err?.logs) {
          console.error('Program logs:', err.logs)
        }
        if (err?.context) {
          console.error('Error context:', err.context)
        }
        
        throw err
      }
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      toast.success('Poll created successfully!')
      await queryClient.invalidateQueries({ queryKey: ['voting', 'accounts', { cluster }] })
    },
    onError: (error: any) => {
      console.error('Poll creation error:')
      console.error('Error name:', error?.name)
      console.error('Error message:', error?.message)
      console.error('Error cause:', error?.cause)
      console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error || {}), 2))

      let errorMessage = 'Failed to initialize poll'

      if (error?.message) {
        if (error.message.includes('Blockhash not found') || error.message.includes('-32002')) {
          errorMessage =
            '❌ Network mismatch! Your wallet must be on Devnet. See the yellow warning box above for instructions.'
        } else if (error.message.includes('Transaction simulation failed') || error.message.includes('-32603')) {
          errorMessage =
            '❌ Transaction failed. Possible reasons: 1) Not enough SOL 2) Poll ID already exists 3) Wrong network'
        } else if (error.message.includes('User rejected')) {
          errorMessage = 'Transaction cancelled by user'
        } else {
          errorMessage = `Failed: ${error.message}`
        }
      } else if (error?.code) {
        if (error.code === -32002) {
          errorMessage = '❌ Network mismatch! Your wallet must be on Devnet. Check the yellow warning box above.'
        } else if (error.code === -32603) {
          errorMessage = '❌ Transaction error. Check: 1) Wallet has SOL 2) Poll ID is unique 3) On Devnet network'
        } else {
          errorMessage = `Error code: ${error.code}`
        }
      } else if (typeof error === 'string') {
        errorMessage = error
      }

      toast.error(errorMessage, { duration: 8000 })
    },
  })
}
