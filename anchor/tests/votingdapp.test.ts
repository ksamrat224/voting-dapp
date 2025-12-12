import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair, PublicKey } from '@solana/web3.js'
import { loadKeypairSignerFromFile } from 'gill/node'
import { Voting } from '../target/types/voting'

import { startAnchor } from 'solana-bankrun'
import { BankrunProvider } from 'anchor-bankrun'

const IDL = require('../target/idl/voting.json')

const VotingAddress = new PublicKey('Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe')

describe('Voting', () => {
  it('Initialize Poll', async () => {
    const context = await startAnchor(' ', [{ name: 'voting', programId: VotingAddress }], [])
    const provider = new BankrunProvider(context)

    const votingProgram = new Program<Voting>(IDL, provider)

    await votingProgram.methods.initializePoll(
      new anchor.BN(1),
      "What is your favorite programming language?",
      new anchor.BN(0),
      new anchor.BN(1821246480),
    );
  })
})
