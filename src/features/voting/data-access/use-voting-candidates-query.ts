import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getVotingCandidateAccounts } from '@project/anchor'
import { useVotingAccountsQueryKey } from './use-voting-accounts-query-key'

export function useVotingCandidatesQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: [...useVotingAccountsQueryKey(), 'candidates'],
    queryFn: async () => await getVotingCandidateAccounts(client.rpc),
  })
}
