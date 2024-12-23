#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod roadmapfromrustdevtosolanadev {
    use super::*;

  pub fn close(_ctx: Context<CloseRoadmapfromrustdevtosolanadev>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.roadmapfromrustdevtosolanadev.count = ctx.accounts.roadmapfromrustdevtosolanadev.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.roadmapfromrustdevtosolanadev.count = ctx.accounts.roadmapfromrustdevtosolanadev.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeRoadmapfromrustdevtosolanadev>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.roadmapfromrustdevtosolanadev.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeRoadmapfromrustdevtosolanadev<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Roadmapfromrustdevtosolanadev::INIT_SPACE,
  payer = payer
  )]
  pub roadmapfromrustdevtosolanadev: Account<'info, Roadmapfromrustdevtosolanadev>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseRoadmapfromrustdevtosolanadev<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub roadmapfromrustdevtosolanadev: Account<'info, Roadmapfromrustdevtosolanadev>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub roadmapfromrustdevtosolanadev: Account<'info, Roadmapfromrustdevtosolanadev>,
}

#[account]
#[derive(InitSpace)]
pub struct Roadmapfromrustdevtosolanadev {
  count: u8,
}
