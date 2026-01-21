import { useSolana } from '@/components/solana/use-solana'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { getInitializePollInstruction, getPollPda } from '@project/anchor'
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
      const [pollPda] = await getPollPda(pollId)

      return await signAndSend(
        getInitializePollInstruction({
          signer,
          poll: pollPda,
          pollId,
          description,
          pollStart,
          pollEnd,
        }),
        signer,
      )
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await queryClient.invalidateQueries({ queryKey: ['voting', 'accounts', { cluster }] })
    },
    onError: (error) => {
      toast.error('Failed to initialize poll: ' + error.message)
    },
  })
}
