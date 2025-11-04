#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe");

#[program]
pub mod votingdapp {
    use super::*;

    pub fn close(_ctx: Context<CloseVotingdapp>) -> Result<()> {
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.votingdapp.count = ctx.accounts.votingdapp.count.checked_sub(1).unwrap();
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.votingdapp.count = ctx.accounts.votingdapp.count.checked_add(1).unwrap();
        Ok(())
    }

    pub fn initialize(_ctx: Context<InitializeVotingdapp>) -> Result<()> {
        Ok(())
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        ctx.accounts.votingdapp.count = value.clone();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeVotingdapp<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  init,
  space = 8 + Votingdapp::INIT_SPACE,
  payer = payer
    )]
    pub votingdapp: Account<'info, Votingdapp>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseVotingdapp<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  mut,
  close = payer, // close account and return lamports to payer
    )]
    pub votingdapp: Account<'info, Votingdapp>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub votingdapp: Account<'info, Votingdapp>,
}

#[account]
#[derive(InitSpace)]
pub struct Votingdapp {
    count: u8,
}
