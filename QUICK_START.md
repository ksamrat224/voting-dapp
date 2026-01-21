# Quick Start - Voting dApp

## If Your Test Validator is Already Running:

### 1. Deploy the Program

```bash
cd /home/samrat-karki/Desktop/solana/voting-dapp/anchor
anchor deploy
```

### 2. Start the Frontend

```bash
cd /home/samrat-karki/Desktop/solana/voting-dapp
npm run dev
```

### 3. Configure Your Wallet

- Open your wallet (Phantom, Solflare, etc.)
- Switch network to **Localhost**
- Get some SOL: `solana airdrop 2`

### 4. Use the App

- Visit http://localhost:3000/voting
- Connect your wallet
- Create a poll, add candidates, and vote!

---

## To Use Devnet Instead:

### 1. Configure Solana CLI

```bash
solana config set --url devnet
```

### 2. Get Devnet SOL

```bash
solana airdrop 2
```

### 3. Deploy to Devnet

```bash
cd /home/samrat-karki/Desktop/solana/voting-dapp/anchor
anchor deploy --provider.cluster devnet
```

### 4. Start Frontend & Switch Network

```bash
cd /home/samrat-karki/Desktop/solana/voting-dapp
npm run dev
```

- Visit http://localhost:3000
- Click network dropdown in top nav
- Select **Devnet**
- Connect your wallet (must be on Devnet too)

---

## Common Commands

```bash
# Check your balance
solana balance

# View program logs
solana logs

# Airdrop SOL (testnet only)
solana airdrop 2

# Check which network you're on
solana config get

# Build the program
cd anchor && anchor build

# Run tests
cd anchor && anchor test
```

---

## Troubleshooting

**"Program account not found"**
→ Deploy the program: `cd anchor && anchor deploy`

**"Insufficient funds"**
→ Airdrop SOL: `solana airdrop 2`

**"No polls found"**
→ Create a poll using the "Create & Manage" tab

---

See [VOTING_GUIDE.md](./VOTING_GUIDE.md) for complete documentation.
