import { AppExplorerLink } from '@/components/app-explorer-link'
import { VOTING_PROGRAM_ADDRESS } from '@project/anchor'

export function VotingUiProgramExplorerLink() {
  return <AppExplorerLink label="View Program" address={VOTING_PROGRAM_ADDRESS} />
}
