import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UiWalletAccount } from '@wallet-ui/react'
import { useVotingInitializeCandidateMutation } from '@/features/voting/data-access/use-voting-initialize-candidate-mutation'

export function VotingUiAddCandidate({ account, pollId }: { account: UiWalletAccount; pollId: bigint }) {
  const [candidateName, setCandidateName] = useState('')
  const mutation = useVotingInitializeCandidateMutation({ account })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await mutation.mutateAsync({ candidateName, pollId })
    setCandidateName('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Candidate</CardTitle>
        <CardDescription>Add a new candidate to this poll</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="candidateName">Candidate Name</Label>
            <Input
              id="candidateName"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter candidate name (e.g., Rust)"
              maxLength={32}
              required
            />
          </div>
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? 'Adding Candidate...' : 'Add Candidate'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
