# Voting dApp - Complete Usage Guide

## Overview

This is a decentralized voting application built on Solana. It allows you to:

- Create polls with custom descriptions and time windows
- Add multiple candidates to polls
- Vote for candidates
- View real-time voting results

## Prerequisites

- Node.js and npm installed
- Solana CLI installed
- A Solana wallet (Phantom, Solflare, etc.)

## Quick Start Guide

### 1. Testing Locally with Test Validator

#### Start the Solana Test Validator

```bash
# In terminal 1
solana-test-validator
```

This starts a local Solana blockchain for testing. Keep this terminal running.

#### Build and Deploy the Program

```bash
# In terminal 2, from the project root
cd anchor
anchor build
anchor deploy
```

The program will be deployed to your local test validator at address: `Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe`

#### Start the Frontend

```bash
# In terminal 3, from the project root
npm run dev
```

Visit `http://localhost:3000` and navigate to the "Voting" page.

#### Configure Your Wallet for Local Testing

1. Open your Solana wallet (e.g., Phantom)
2. Go to Settings → Change Network → Localhost
3. Airdrop yourself some SOL for testing:

```bash
solana airdrop 2
```

### 2. Using Devnet (Recommended for Sharing)

Devnet is Solana's public test network. It's better for sharing your dApp with others.

#### Configure Solana CLI for Devnet

```bash
solana config set --url devnet
```

#### Get Some Devnet SOL

```bash
solana airdrop 2
```

Or use the web faucet: https://faucet.solana.com/

#### Deploy to Devnet

```bash
cd anchor
anchor build
anchor deploy --provider.cluster devnet
```

#### Update Frontend to Use Devnet

1. Start the frontend: `npm run dev`
2. Go to http://localhost:3000
3. In the top navigation, click the network dropdown and select "Devnet"
4. Connect your wallet (make sure your wallet is also on Devnet)

## How to Use the Voting dApp

### Step 1: Create a Poll

1. Connect your wallet
2. Go to the "Voting" page
3. Click the "Create & Manage" tab
4. Fill in the poll details:
   - **Poll ID**: A unique number (e.g., 1, 2, 3...)
   - **Description**: Your poll question (e.g., "What is your favorite programming language?")
   - **Start Time**: When voting should begin (optional, defaults to now)
   - **End Time**: When voting should end (optional, defaults to 24 hours from now)
5. Click "Create Poll"
6. Approve the transaction in your wallet

### Step 2: Add Candidates

1. Stay in the "Create & Manage" tab
2. Select your poll from the dropdown
3. Enter a candidate name (e.g., "Rust", "Python", "JavaScript")
4. Click "Add Candidate"
5. Approve the transaction
6. Repeat for all candidates you want to add

### Step 3: Vote

1. Go to the "View Polls" tab
2. You'll see all active polls with their candidates
3. Click the "Vote" button next to your preferred candidate
4. Approve the transaction
5. The results update in real-time!

### Step 4: View Results

- Results are displayed as a progress bar showing vote percentages
- Total vote counts are shown for each candidate
- Poll status (Active/Ended) is displayed
- You can click "View Poll Account" to see the on-chain data

## Understanding the Blockchain Transactions

Each action costs a small amount of SOL:

1. **Creating a Poll**: ~0.002 SOL (creates a new account on-chain)
2. **Adding a Candidate**: ~0.002 SOL (creates a new account on-chain)
3. **Voting**: <0.0001 SOL (just updates an existing account)

## Common Issues and Solutions

### Issue: "Program account not found"

**Solution**: Make sure:

- Your test validator is running (for local testing)
- The program is deployed: `anchor deploy`
- Your wallet is connected to the correct network

### Issue: "Transaction failed"

**Solution**:

- Check you have enough SOL in your wallet
- Make sure the poll ID is unique when creating a poll
- Verify the poll is still active when voting

### Issue: "No polls found"

**Solution**: Create a poll first using the "Create & Manage" tab

## Network Configuration

### Local Testing (solana-test-validator)

- **Endpoint**: http://localhost:8899
- **Best for**: Development and testing
- **Advantages**: Fast, free, private
- **Limitations**: Only accessible on your machine

### Devnet

- **Endpoint**: https://api.devnet.solana.com
- **Best for**: Public testing and demos
- **Advantages**: Accessible by anyone, similar to mainnet
- **Limitations**: Slower than local, requires devnet SOL

### Mainnet (Production)

- **Endpoint**: https://api.mainnet-beta.solana.com
- **Best for**: Real applications with real value
- **Cost**: Uses real SOL

## Program Architecture

### On-Chain Accounts

1. **Poll Account**
   - Stores: Poll ID, description, start/end times, candidate count
   - PDA Seed: `[poll_id]`

2. **Candidate Account**
   - Stores: Candidate name, vote count
   - PDA Seed: `[candidate_name, poll_id]`

### Available Instructions

1. `initialize_poll`: Creates a new poll
2. `initialize_candidate`: Adds a candidate to a poll
3. `vote`: Increments a candidate's vote count

## Development Tips

### Regenerate TypeScript Client After Program Changes

```bash
# After modifying the Rust program
anchor build
npx codama -c anchor/codama.js run js
```

### View Program Logs

```bash
solana logs
```

### Check Your Wallet Balance

```bash
solana balance
```

### View Program Accounts

```bash
solana account Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe
```

## Next Steps

- Modify the program to add features like:
  - Preventing double voting (track voters)
  - Weighted voting
  - Poll categories
  - Voting with tokens

- Enhance the UI with:
  - Filtering and search
  - Historical polls
  - User voting history
  - Charts and analytics

## Support Resources

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Stack Exchange](https://solana.stackexchange.com/)
- [Solana Discord](https://discord.gg/solana)

## Project Structure

```
voting-dapp/
├── anchor/                          # Solana program
│   ├── programs/voting/src/lib.rs  # Smart contract code
│   ├── target/idl/voting.json      # Interface Definition Language
│   └── src/                        # Generated TypeScript client
├── src/
│   ├── app/voting/                 # Voting page
│   ├── features/voting/            # Voting feature components
│   │   ├── data-access/           # React Query hooks
│   │   └── ui/                    # UI components
│   └── components/                # Shared components
└── README.md
```

Enjoy building on Solana! 🚀
