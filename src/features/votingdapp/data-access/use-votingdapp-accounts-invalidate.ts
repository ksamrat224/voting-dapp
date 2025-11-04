import { useQueryClient } from '@tanstack/react-query'
import { useVotingdappAccountsQueryKey } from './use-votingdapp-accounts-query-key'

export function useVotingdappAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useVotingdappAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
