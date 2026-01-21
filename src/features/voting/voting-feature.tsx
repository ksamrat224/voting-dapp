import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { VotingUiProgramGuard } from './ui/voting-ui-program-guard'
import { VotingUiProgramExplorerLink } from './ui/voting-ui-program-explorer-link'
import { VotingUiCreatePoll } from './ui/voting-ui-create-poll'
import { VotingUiAddCandidate } from './ui/voting-ui-add-candidate'
import { VotingUiPollDetails } from './ui/voting-ui-poll-details'
import { useVotingPollsQuery } from './data-access/use-voting-polls-query'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function VotingFeature() {
  const { account } = useSolana()
  const pollsQuery = useVotingPollsQuery()
  const [selectedPollId, setSelectedPollId] = useState<bigint | null>(null)

  const selectedPoll = pollsQuery.data?.find((poll) => poll.data.pollId === selectedPollId)

  return (
    <VotingUiProgramGuard>
      <AppHero
        title="Voting dApp"
        subtitle={
          account
            ? 'Create polls, add candidates, and vote on the Solana blockchain'
            : 'Connect your wallet to participate in voting'
        }
      >
        <p className="mb-6">
          <VotingUiProgramExplorerLink />
        </p>
        {!account && (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>

      <div className="container mx-auto px-4 py-8">
        {account && (
          <Tabs defaultValue="polls" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="polls">View Polls</TabsTrigger>
              <TabsTrigger value="create">Create & Manage</TabsTrigger>
            </TabsList>

            <TabsContent value="polls" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Active Polls</h2>
              {pollsQuery.isLoading && (
                <div className="flex justify-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              )}
              {pollsQuery.data && pollsQuery.data.length === 0 && (
                <p className="text-center text-muted-foreground">No polls found. Create one to get started!</p>
              )}
              {pollsQuery.data && pollsQuery.data.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pollsQuery.data.map((poll) => (
                    <VotingUiPollDetails key={poll.address} account={account} poll={poll} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <VotingUiCreatePoll account={account} />

                {pollsQuery.data && pollsQuery.data.length > 0 && (
                  <div className="space-y-4">
                    <label className="text-sm font-medium">Select Poll to Add Candidates:</label>
                    <select
                      className="w-full p-2 border rounded"
                      onChange={(e) => setSelectedPollId(BigInt(e.target.value))}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Choose a poll
                      </option>
                      {pollsQuery.data.map((poll) => (
                        <option key={poll.address} value={poll.data.pollId.toString()}>
                          Poll #{poll.data.pollId.toString()}: {poll.data.description}
                        </option>
                      ))}
                    </select>
                    {selectedPoll && <VotingUiAddCandidate account={account} pollId={selectedPoll.data.pollId} />}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </VotingUiProgramGuard>
  )
}
