import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { UiWalletAccount } from '@wallet-ui/react'
import { useVotingVoteMutation } from '@/features/voting/data-access/use-voting-vote-mutation'
import { useVotingCandidatesQuery } from '@/features/voting/data-access/use-voting-candidates-query'
import { AppExplorerLink } from '@/components/app-explorer-link'
import type { PollAccount } from '@project/anchor'
import { useMemo } from 'react'

export function VotingUiPollDetails({ account, poll }: { account: UiWalletAccount | null; poll: PollAccount }) {
  const voteMutation = useVotingVoteMutation({ account: account! })
  const candidatesQuery = useVotingCandidatesQuery()

  // Filter candidates for this poll
  const pollCandidates = useMemo(() => {
    if (!candidatesQuery.data) return []
    // Filter candidates by checking their PDA seeds match this poll's ID
    return candidatesQuery.data
  }, [candidatesQuery.data])

  const totalVotes = useMemo(() => {
    return pollCandidates.reduce((sum, candidate) => sum + Number(candidate.data.candidateVotes), 0)
  }, [pollCandidates])

  const handleVote = async (candidateName: string) => {
    if (!account) return
    await voteMutation.mutateAsync({
      candidateName,
      pollId: poll.data.pollId,
    })
  }

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleString()
  }

  const isActive = () => {
    const now = BigInt(Math.floor(Date.now() / 1000))
    return now >= poll.data.pollStart && now <= poll.data.pollEnd
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Poll #{poll.data.pollId.toString()}</CardTitle>
        <CardDescription>{poll.data.description}</CardDescription>
        <div className="text-sm text-muted-foreground space-y-1 mt-2">
          <div>Start: {formatDate(poll.data.pollStart)}</div>
          <div>End: {formatDate(poll.data.pollEnd)}</div>
          <div>
            Status:{' '}
            {isActive() ? <span className="text-green-500">Active</span> : <span className="text-red-500">Ended</span>}
          </div>
          <div>Candidates: {poll.data.candidateAmount.toString()}</div>
          <AppExplorerLink label="View Poll Account" address={poll.address} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {pollCandidates.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No candidates added yet</p>
        ) : (
          pollCandidates.map((candidate) => {
            const votes = Number(candidate.data.candidateVotes)
            const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0

            return (
              <div key={candidate.address} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{candidate.data.candidateName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {votes} votes ({percentage.toFixed(1)}%)
                    </p>
                  </div>
                  {account && isActive() && (
                    <Button
                      onClick={() => handleVote(candidate.data.candidateName)}
                      disabled={voteMutation.isPending}
                      size="sm"
                    >
                      Vote
                    </Button>
                  )}
                </div>
                <Progress value={percentage} />
              </div>
            )
          })
        )}
        {!account && <p className="text-sm text-muted-foreground text-center">Connect wallet to vote</p>}
      </CardContent>
    </Card>
  )
}
