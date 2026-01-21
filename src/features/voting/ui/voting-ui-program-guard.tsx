import { ReactNode } from 'react'
import { AppAlert } from '@/components/app-alert'
import { useSolana } from '@/components/solana/use-solana'
import { useVotingProgram } from '@/features/voting/data-access/use-voting-program'

export function VotingUiProgramGuard({ children }: { children: ReactNode }) {
  const { cluster } = useSolana()
  const programAccountQuery = useVotingProgram()

  if (programAccountQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!programAccountQuery.data?.value) {
    return (
      <AppAlert>
        Voting program account not found on {cluster.label}. Make sure your test validator is running with the program
        deployed, or switch to devnet.
      </AppAlert>
    )
  }

  return children
}
