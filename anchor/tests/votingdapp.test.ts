import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair, PublicKey } from '@solana/web3.js'
import { loadKeypairSignerFromFile } from 'gill/node'
import { Voting } from '../target/types/voting'

import { startAnchor } from 'solana-bankrun'
import { BankrunProvider } from 'anchor-bankrun'
import { before } from 'node:test'

const IDL = require('../target/idl/voting.json')

const VotingAddress = new PublicKey('Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe')

describe('Voting', () => {
  let context: Awaited<ReturnType<typeof startAnchor>>
  let provider: BankrunProvider
  let votingProgram: Program<Voting>

  beforeAll(async () => {
    context = await startAnchor('', [{ name: 'voting', programId: VotingAddress }], [])
    provider = new BankrunProvider(context)

    votingProgram = new Program<Voting>(IDL, provider)
  })

  it('Initialize Poll', async () => {
    await votingProgram.methods
      .initializePoll(
        new anchor.BN(1),
        'What is your favorite programming language?',
        new anchor.BN(0),
        new anchor.BN(1821246480),
      )
      .rpc()

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      VotingAddress,
    )
    const poll = await votingProgram.account.poll.fetch(pollAddress)
    console.log(poll)

    expect(poll.pollId.toNumber()).toEqual(1)
    expect(poll.description).toEqual('What is your favorite programming language?')
    expect(poll.pollStart.toNumber()).toBeLessThan(poll.pollEnd.toNumber())
  })

  it('initialize candidate', async () => {
    await votingProgram.methods.initializeCandidate('Rust', new anchor.BN(1)).rpc()

    await votingProgram.methods.initializeCandidate('Solana', new anchor.BN(1)).rpc()

    const [rustAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from('Rust'), new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      VotingAddress,
    )
    const rustCandidate = await votingProgram.account.candidate.fetch(rustAddress)
    console.log(rustCandidate);

    const [solanaAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from('Solana'), new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      VotingAddress,
    )
    const solanaCandidate = await votingProgram.account.candidate.fetch(solanaAddress)
    console.log(solanaCandidate)
  })

  it('initialize vote', async () => {})
})
