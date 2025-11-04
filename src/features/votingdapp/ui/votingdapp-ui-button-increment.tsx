import { VotingdappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useVotingdappIncrementMutation } from '../data-access/use-votingdapp-increment-mutation'

export function VotingdappUiButtonIncrement({ account, votingdapp }: { account: UiWalletAccount; votingdapp: VotingdappAccount }) {
  const incrementMutation = useVotingdappIncrementMutation({ account, votingdapp })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}
