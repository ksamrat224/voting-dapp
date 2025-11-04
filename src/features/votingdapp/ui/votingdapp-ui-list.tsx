import { VotingdappUiCard } from './votingdapp-ui-card'
import { useVotingdappAccountsQuery } from '@/features/votingdapp/data-access/use-votingdapp-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function VotingdappUiList({ account }: { account: UiWalletAccount }) {
  const votingdappAccountsQuery = useVotingdappAccountsQuery()

  if (votingdappAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!votingdappAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {votingdappAccountsQuery.data?.map((votingdapp) => (
        <VotingdappUiCard account={account} key={votingdapp.address} votingdapp={votingdapp} />
      ))}
    </div>
  )
}
