import { useQueryClient } from '@tanstack/react-query';

export const useRefreshSession = () => {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({ queryKey: ['session'] });
    await queryClient.invalidateQueries({ queryKey: ['pokemons'] });
  };
};
