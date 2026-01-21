import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UiWalletAccount } from '@wallet-ui/react'
import { useVotingInitializePollMutation } from '@/features/voting/data-access/use-voting-initialize-poll-mutation'

export function VotingUiCreatePoll({ account }: { account: UiWalletAccount }) {
  const [pollId, setPollId] = useState('')
  const [description, setDescription] = useState('')
  const [pollStart, setPollStart] = useState('')
  const [pollEnd, setPollEnd] = useState('')

  const mutation = useVotingInitializePollMutation({ account })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const startTime = pollStart ? BigInt(new Date(pollStart).getTime() / 1000) : BigInt(Math.floor(Date.now() / 1000))
    const endTime = pollEnd ? BigInt(new Date(pollEnd).getTime() / 1000) : BigInt(Math.floor(Date.now() / 1000) + 86400)

    await mutation.mutateAsync({
      pollId: BigInt(pollId),
      description,
      pollStart: startTime,
      pollEnd: endTime,
    })

    // Reset form
    setPollId('')
    setDescription('')
    setPollStart('')
    setPollEnd('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Poll</CardTitle>
        <CardDescription>Create a new voting poll on the blockchain</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="pollId">Poll ID</Label>
            <Input
              id="pollId"
              type="number"
              value={pollId}
              onChange={(e) => setPollId(e.target.value)}
              placeholder="Enter a unique poll ID (e.g., 1)"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is your favorite programming language?"
              maxLength={280}
              required
            />
          </div>
          <div>
            <Label htmlFor="pollStart">Start Time (optional)</Label>
            <Input
              id="pollStart"
              type="datetime-local"
              value={pollStart}
              onChange={(e) => setPollStart(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="pollEnd">End Time (optional)</Label>
            <Input id="pollEnd" type="datetime-local" value={pollEnd} onChange={(e) => setPollEnd(e.target.value)} />
          </div>
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? 'Creating Poll...' : 'Create Poll'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
