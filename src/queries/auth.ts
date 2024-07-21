import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '../router';
import { token } from '../utils/storage';
import queries from './query-key-factory';

export function useTokenQuery(code: string | null) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    ...queries.auth.token(code as string),
    enabled: !!code,
  });

  useEffect(() => {
    if (data?.data?.accessToken) {
      console.log(queries.users.detail._def);
      queryClient.invalidateQueries({ queryKey: queries.users.detail._def });
      token.setAccessToken(data.data.accessToken);
      if (data.data.isNewUser === 'Y') {
        navigate(routes.join);
      } else {
        navigate(routes.home);
      }
    }
  }, [data, navigate, queryClient]);

  return data;
}
