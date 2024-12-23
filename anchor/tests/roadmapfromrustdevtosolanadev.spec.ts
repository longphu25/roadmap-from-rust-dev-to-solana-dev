import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Roadmapfromrustdevtosolanadev} from '../target/types/roadmapfromrustdevtosolanadev'

describe('roadmapfromrustdevtosolanadev', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Roadmapfromrustdevtosolanadev as Program<Roadmapfromrustdevtosolanadev>

  const roadmapfromrustdevtosolanadevKeypair = Keypair.generate()

  it('Initialize Roadmapfromrustdevtosolanadev', async () => {
    await program.methods
      .initialize()
      .accounts({
        roadmapfromrustdevtosolanadev: roadmapfromrustdevtosolanadevKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([roadmapfromrustdevtosolanadevKeypair])
      .rpc()

    const currentCount = await program.account.roadmapfromrustdevtosolanadev.fetch(roadmapfromrustdevtosolanadevKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Roadmapfromrustdevtosolanadev', async () => {
    await program.methods.increment().accounts({ roadmapfromrustdevtosolanadev: roadmapfromrustdevtosolanadevKeypair.publicKey }).rpc()

    const currentCount = await program.account.roadmapfromrustdevtosolanadev.fetch(roadmapfromrustdevtosolanadevKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Roadmapfromrustdevtosolanadev Again', async () => {
    await program.methods.increment().accounts({ roadmapfromrustdevtosolanadev: roadmapfromrustdevtosolanadevKeypair.publicKey }).rpc()

    const currentCount = await program.account.roadmapfromrustdevtosolanadev.fetch(roadmapfromrustdevtosolanadevKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Roadmapfromrustdevtosolanadev', async () => {
    await program.methods.decrement().accounts({ roadmapfromrustdevtosolanadev: roadmapfromrustdevtosolanadevKeypair.publicKey }).rpc()

    const currentCount = await program.account.roadmapfromrustdevtosolanadev.fetch(roadmapfromrustdevtosolanadevKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set roadmapfromrustdevtosolanadev value', async () => {
    await program.methods.set(42).accounts({ roadmapfromrustdevtosolanadev: roadmapfromrustdevtosolanadevKeypair.publicKey }).rpc()

    const currentCount = await program.account.roadmapfromrustdevtosolanadev.fetch(roadmapfromrustdevtosolanadevKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the roadmapfromrustdevtosolanadev account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        roadmapfromrustdevtosolanadev: roadmapfromrustdevtosolanadevKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.roadmapfromrustdevtosolanadev.fetchNullable(roadmapfromrustdevtosolanadevKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
