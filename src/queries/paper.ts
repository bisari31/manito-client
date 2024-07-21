import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { routes } from '../router';
import { createRollingPaper } from '../services/paper';
import queries from './query-key-factory';

export const useCreateRollingPaper = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createRollingPaper,
    onSuccess: (data) => {
      navigate(routes.rolling.detail(data.data?.id));
    },
  });
};

export const usePaperQuery = (userId?: number) => {
  return useQuery({
    ...queries.papers.all(userId),
    staleTime: 1000 * 60 * 60,
    enabled: !!userId,
  });
};

export const usePaperDetailQuery = () => {
  const { id } = useParams();
  const query = useQuery({
    ...queries.papers.detail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 6, // 삭제 바람!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  });

  if (query.isError || query.data?.result === 'Fail') throw new Error();

  return query;
};
