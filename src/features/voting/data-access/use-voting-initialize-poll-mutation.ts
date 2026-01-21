import { useSolana } from '@/components/solana/use-solana'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { getInitializePollInstructionAsync } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'

export function useVotingInitializePollMutation({ account }: { account: UiWalletAccount }) {
  const { cluster } = useSolana()
  const queryClient = useQueryClient()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

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
      const instruction = await getInitializePollInstructionAsync({
        signer,
        pollId,
        description,
        pollStart,
        pollEnd,
      })

      return await signAndSend(instruction, signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      toast.success('Poll created successfully!')
      await queryClient.invalidateQueries({ queryKey: ['voting', 'accounts', { cluster }] })
    },
    onError: (error: any) => {
      console.error('Poll creation error:', error)
      
      let errorMessage = 'Failed to initialize poll'
      
      if (error?.message) {
        if (error.message.includes('Blockhash not found')) {
          errorMessage = 'Network mismatch! Make sure your wallet is on the same network as the app (check the yellow warning above)'
        } else if (error.message.includes('Transaction simulation failed')) {
          errorMessage = 'Transaction failed. Check that: 1) Your wallet has enough SOL, 2) Poll ID is unique, 3) You\'re on the correct network'
        } else {
          errorMessage = `Failed: ${error.message}`
        }
      }
      
      toast.error(errorMessage, { duration: 6000 })
    },
  })
}
