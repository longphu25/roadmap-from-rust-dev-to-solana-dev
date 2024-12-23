import { getRoadmapfromrustdevtosolanadevProgram, getRoadmapfromrustdevtosolanadevProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useRoadmapfromrustdevtosolanadevProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getRoadmapfromrustdevtosolanadevProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getRoadmapfromrustdevtosolanadevProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['roadmapfromrustdevtosolanadev', 'all', { cluster }],
    queryFn: () => program.account.roadmapfromrustdevtosolanadev.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['roadmapfromrustdevtosolanadev', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ roadmapfromrustdevtosolanadev: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useRoadmapfromrustdevtosolanadevProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useRoadmapfromrustdevtosolanadevProgram()

  const accountQuery = useQuery({
    queryKey: ['roadmapfromrustdevtosolanadev', 'fetch', { cluster, account }],
    queryFn: () => program.account.roadmapfromrustdevtosolanadev.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['roadmapfromrustdevtosolanadev', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ roadmapfromrustdevtosolanadev: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['roadmapfromrustdevtosolanadev', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ roadmapfromrustdevtosolanadev: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['roadmapfromrustdevtosolanadev', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ roadmapfromrustdevtosolanadev: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['roadmapfromrustdevtosolanadev', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ roadmapfromrustdevtosolanadev: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
