import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useVotingdappInitializeMutation } from '@/features/votingdapp/data-access/use-votingdapp-initialize-mutation'

export function VotingdappUiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useVotingdappInitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Votingdapp {mutationInitialize.isPending && '...'}
    </Button>
  )
}
