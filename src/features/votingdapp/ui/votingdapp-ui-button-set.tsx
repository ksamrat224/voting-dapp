import { VotingdappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useVotingdappSetMutation } from '@/features/votingdapp/data-access/use-votingdapp-set-mutation'

export function VotingdappUiButtonSet({ account, votingdapp }: { account: UiWalletAccount; votingdapp: VotingdappAccount }) {
  const setMutation = useVotingdappSetMutation({ account, votingdapp })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', votingdapp.data.count.toString() ?? '0')
        if (!value || parseInt(value) === votingdapp.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}
