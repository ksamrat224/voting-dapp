import { useSolana } from '@/components/solana/use-solana'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { getInitializeCandidateInstruction, getPollPda, getCandidatePda } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'

export function useVotingInitializeCandidateMutation({ account }: { account: UiWalletAccount }) {
  const { cluster } = useSolana()
  const queryClient = useQueryClient()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async ({ candidateName, pollId }: { candidateName: string; pollId: bigint }) => {
      const [pollPda] = await getPollPda(pollId)
      const [candidatePda] = await getCandidatePda(candidateName, pollId)

      return await signAndSend(
        getInitializeCandidateInstruction({
          signer,
          poll: pollPda,
          candidate: candidatePda,
          candidateName,
          pollId,
        }),
        signer,
      )
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await queryClient.invalidateQueries({ queryKey: ['voting', 'accounts', { cluster }] })
    },
    onError: (error) => {
      toast.error('Failed to add candidate: ' + error.message)
    },
  })
}
