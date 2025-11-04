import { useSolana } from '@/components/solana/use-solana'

export function useVotingdappAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['votingdapp', 'accounts', { cluster }]
}
