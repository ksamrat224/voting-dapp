import { VotingdappAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { VotingdappUiButtonClose } from './votingdapp-ui-button-close'
import { VotingdappUiButtonDecrement } from './votingdapp-ui-button-decrement'
import { VotingdappUiButtonIncrement } from './votingdapp-ui-button-increment'
import { VotingdappUiButtonSet } from './votingdapp-ui-button-set'

export function VotingdappUiCard({ account, votingdapp }: { account: UiWalletAccount; votingdapp: VotingdappAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Votingdapp: {votingdapp.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={votingdapp.address} label={ellipsify(votingdapp.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <VotingdappUiButtonIncrement account={account} votingdapp={votingdapp} />
          <VotingdappUiButtonSet account={account} votingdapp={votingdapp} />
          <VotingdappUiButtonDecrement account={account} votingdapp={votingdapp} />
          <VotingdappUiButtonClose account={account} votingdapp={votingdapp} />
        </div>
      </CardContent>
    </Card>
  )
}
