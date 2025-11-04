import { VotingdappAccount, getDecrementInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useVotingdappAccountsInvalidate } from './use-votingdapp-accounts-invalidate'

export function useVotingdappDecrementMutation({
  account,
  votingdapp,
}: {
  account: UiWalletAccount
  votingdapp: VotingdappAccount
}) {
  const invalidateAccounts = useVotingdappAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ votingdapp: votingdapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
