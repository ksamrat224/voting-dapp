import { VotingdappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useVotingdappDecrementMutation } from '../data-access/use-votingdapp-decrement-mutation'

export function VotingdappUiButtonDecrement({ account, votingdapp }: { account: UiWalletAccount; votingdapp: VotingdappAccount }) {
  const decrementMutation = useVotingdappDecrementMutation({ account, votingdapp })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}
