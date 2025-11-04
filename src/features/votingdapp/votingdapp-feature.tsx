import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { VotingdappUiButtonInitialize } from './ui/votingdapp-ui-button-initialize'
import { VotingdappUiList } from './ui/votingdapp-ui-list'
import { VotingdappUiProgramExplorerLink } from './ui/votingdapp-ui-program-explorer-link'
import { VotingdappUiProgramGuard } from './ui/votingdapp-ui-program-guard'

export default function VotingdappFeature() {
  const { account } = useSolana()

  return (
    <VotingdappUiProgramGuard>
      <AppHero
        title="Votingdapp"
        subtitle={
          account
            ? "Initialize a new votingdapp onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <VotingdappUiProgramExplorerLink />
        </p>
        {account ? (
          <VotingdappUiButtonInitialize account={account} />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <VotingdappUiList account={account} /> : null}
    </VotingdappUiProgramGuard>
  )
}
