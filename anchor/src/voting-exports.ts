// Here we export useful types and functions for interacting with the Voting program.
import { Account, getBase58Decoder, SolanaClient, getProgramDerivedAddress, getU64Encoder } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import {
  Poll,
  Candidate,
  POLL_DISCRIMINATOR,
  CANDIDATE_DISCRIMINATOR,
  VOTING_PROGRAM_ADDRESS,
  getPollDecoder,
  getCandidateDecoder,
} from './client/js'
import VotingIDL from '../target/idl/voting.json'

export type PollAccount = Account<Poll, string>
export type CandidateAccount = Account<Candidate, string>

// Re-export the generated IDL and types
export { VotingIDL }

export * from './client/js'

// Helper to get all poll accounts
export function getVotingPollAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getPollDecoder(),
    filter: getBase58Decoder().decode(POLL_DISCRIMINATOR),
    programAddress: VOTING_PROGRAM_ADDRESS,
  })
}

// Helper to get all candidate accounts
export function getVotingCandidateAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getCandidateDecoder(),
    filter: getBase58Decoder().decode(CANDIDATE_DISCRIMINATOR),
    programAddress: VOTING_PROGRAM_ADDRESS,
  })
}

// Helper to derive poll PDA
export function getPollPda(pollId: bigint) {
  return getProgramDerivedAddress({
    programAddress: VOTING_PROGRAM_ADDRESS,
    seeds: [getU64Encoder().encode(pollId)],
  })
}

// Helper to derive candidate PDA
export function getCandidatePda(candidateName: string, pollId: bigint) {
  const encoder = new TextEncoder()
  return getProgramDerivedAddress({
    programAddress: VOTING_PROGRAM_ADDRESS,
    seeds: [encoder.encode(candidateName), getU64Encoder().encode(pollId)],
  })
}
