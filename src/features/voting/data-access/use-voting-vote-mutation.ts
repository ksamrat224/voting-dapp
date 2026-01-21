import { useSolana } from '@/components/solana/use-solana'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { getVoteInstructionAsync } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'
import { createTransaction, getBase58Decoder, signAndSendTransactionMessageWithSigners } from 'gill'

export function useVotingVoteMutation({ account }: { account: UiWalletAccount }) {
  const { cluster, client } = useSolana()
  const queryClient = useQueryClient()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async ({ candidateName, pollId }: { candidateName: string; pollId: bigint }) => {
      // Get the latest blockhash
      const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()

      const instruction = await getVoteInstructionAsync({
        signer,
        candidateName,
        pollId,
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

      console.log('Vote cast with signature:', signature)
      return signature
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      toast.success('Vote cast successfully!')
      await queryClient.invalidateQueries({ queryKey: ['voting', 'accounts', { cluster }] })
    },
    onError: (error: any) => {
      toast.error('Failed to vote: ' + (error?.message || 'Unknown error'))
    },
  })
}
