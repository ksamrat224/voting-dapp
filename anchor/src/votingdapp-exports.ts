// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Votingdapp, VOTINGDAPP_DISCRIMINATOR, VOTINGDAPP_PROGRAM_ADDRESS, getVotingdappDecoder } from './client/js'
import VotingdappIDL from '../target/idl/votingdapp.json'

export type VotingdappAccount = Account<Votingdapp, string>

// Re-export the generated IDL and type
export { VotingdappIDL }

export * from './client/js'

export function getVotingdappProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getVotingdappDecoder(),
    filter: getBase58Decoder().decode(VOTINGDAPP_DISCRIMINATOR),
    programAddress: VOTINGDAPP_PROGRAM_ADDRESS,
  })
}
