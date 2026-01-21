import { useSolana } from '@/components/solana/use-solana'

export function useVotingAccountsQueryKey() {
  const { cluster } = useSolana()
  return ['voting', 'accounts', { cluster }] as const
}
