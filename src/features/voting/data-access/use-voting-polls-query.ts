import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getVotingPollAccounts } from '@project/anchor'
import { useVotingAccountsQueryKey } from './use-voting-accounts-query-key'

export function useVotingPollsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: [...useVotingAccountsQueryKey(), 'polls'],
    queryFn: async () => await getVotingPollAccounts(client.rpc),
  })
}
