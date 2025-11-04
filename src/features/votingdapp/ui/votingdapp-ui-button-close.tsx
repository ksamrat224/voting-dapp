import { VotingdappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useVotingdappCloseMutation } from '@/features/votingdapp/data-access/use-votingdapp-close-mutation'

export function VotingdappUiButtonClose({ account, votingdapp }: { account: UiWalletAccount; votingdapp: VotingdappAccount }) {
  const closeMutation = useVotingdappCloseMutation({ account, votingdapp })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}
