#![allow(clippy::result_large_err)] //disabled for large result errors

use anchor_lang::prelude::*; //this provides all the necessary imports from the anchor lang crate(types, macros, traits, etc)

declare_id!("Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe"); //setting the  program's unique public key on solana blockchain

#[program] //macro that marks entry point of the program
pub mod voting {
    use super::*;
    //function to initialize a new poll
    pub fn initialize_poll(ctx: Context<InitializePoll>, 
                           poll_id: u64,
                           description: String,
                           poll_start: u64,
                           poll_end: u64,) -> Result<()>{
        let poll_account = &mut ctx.accounts.poll; //mutable reference to the poll account
        poll_account.poll_id = poll_id;
        poll_account.description = description;
        poll_account.poll_start = poll_start;
        poll_account.poll_end = poll_end;
        poll_account.candidate_amount = 0; 

        Ok(())
    }

    
}
#[derive(Accounts)] //tells Anchor that this struct defines how to validate Solana accounts for this instruction
#[instruction(poll_id: u64)] //allows using the poll_id in the struct (for seed generation)
pub struct  InitializePoll<'info> {
    #[account(mut)]
    pub signer: Signer<'info>, //The wallet of the user creating the poll (mut means they can sign and pay)
    #[account(
        init,
        payer= signer,
        space = 8 + Poll::INIT_SPACE,
        seeds = [poll_id.to_le_bytes().as_ref()],
        bump
    )]
    pub poll: Account<'info,Poll>, //the account that will store the poll data
    pub system_program: Program<'info,System>, //Reference to Solana’s system instructions.
}
#[account] //macro that marks this struct as an on-chain account
#[derive(InitSpace)] //derive macro to calculate the space needed for the account,does automatically

pub struct Poll {
    pub poll_id: u64,
    #[max_len(280)]
    pub description: String,
    pub poll_start: u64,
    pub poll_end: u64,
    pub candidate_amount: u64, 
}

