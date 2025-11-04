import { VOTINGDAPP_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function VotingdappUiProgramExplorerLink() {
  return <AppExplorerLink address={VOTINGDAPP_PROGRAM_ADDRESS} label={ellipsify(VOTINGDAPP_PROGRAM_ADDRESS)} />
}
