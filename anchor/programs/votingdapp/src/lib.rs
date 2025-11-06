#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe");

#[program]
pub mod voting {
    use super::*;

    
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
