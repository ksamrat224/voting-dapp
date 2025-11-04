import { VotingdappAccount, getIncrementInstruction } from '@project/anchor'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { useMutation } from '@tanstack/react-query'
import { toastTx } from '@/components/toast-tx'
import { useVotingdappAccountsInvalidate } from './use-votingdapp-accounts-invalidate'

export function useVotingdappIncrementMutation({
  account,
  votingdapp,
}: {
  account: UiWalletAccount
  votingdapp: VotingdappAccount
}) {
  const invalidateAccounts = useVotingdappAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ votingdapp: votingdapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
