import { useSolana } from '@/components/solana/use-solana'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { getInitializeCandidateInstructionAsync } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'
import { createTransaction, getBase58Decoder, signAndSendTransactionMessageWithSigners } from 'gill'

export function useVotingInitializeCandidateMutation({ account }: { account: UiWalletAccount }) {
  const { cluster, client } = useSolana()
  const queryClient = useQueryClient()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async ({ candidateName, pollId }: { candidateName: string; pollId: bigint }) => {
      // Get the latest blockhash
      const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()

      const instruction = await getInitializeCandidateInstructionAsync({
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

      console.log('Candidate added with signature:', signature)
      return signature
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      toast.success('Candidate added successfully!')
      await queryClient.invalidateQueries({ queryKey: ['voting', 'accounts', { cluster }] })
    },
    onError: (error: any) => {
      toast.error('Failed to add candidate: ' + (error?.message || 'Unknown error'))
    },
  })
}
