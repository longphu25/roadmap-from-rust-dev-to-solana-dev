// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import RoadmapfromrustdevtosolanadevIDL from '../target/idl/roadmapfromrustdevtosolanadev.json'
import type { Roadmapfromrustdevtosolanadev } from '../target/types/roadmapfromrustdevtosolanadev'

// Re-export the generated IDL and type
export { Roadmapfromrustdevtosolanadev, RoadmapfromrustdevtosolanadevIDL }

// The programId is imported from the program IDL.
export const ROADMAPFROMRUSTDEVTOSOLANADEV_PROGRAM_ID = new PublicKey(RoadmapfromrustdevtosolanadevIDL.address)

// This is a helper function to get the Roadmapfromrustdevtosolanadev Anchor program.
export function getRoadmapfromrustdevtosolanadevProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...RoadmapfromrustdevtosolanadevIDL, address: address ? address.toBase58() : RoadmapfromrustdevtosolanadevIDL.address } as Roadmapfromrustdevtosolanadev, provider)
}

// This is a helper function to get the program ID for the Roadmapfromrustdevtosolanadev program depending on the cluster.
export function getRoadmapfromrustdevtosolanadevProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Roadmapfromrustdevtosolanadev program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return ROADMAPFROMRUSTDEVTOSOLANADEV_PROGRAM_ID
  }
}
