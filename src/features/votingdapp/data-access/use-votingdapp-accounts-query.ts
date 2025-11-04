import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getVotingdappProgramAccounts } from '@project/anchor'
import { useVotingdappAccountsQueryKey } from './use-votingdapp-accounts-query-key'

export function useVotingdappAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useVotingdappAccountsQueryKey(),
    queryFn: async () => await getVotingdappProgramAccounts(client.rpc),
  })
}
