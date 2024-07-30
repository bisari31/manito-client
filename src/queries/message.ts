import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { routes } from '../router';
import { createMessage, deleteMessage } from '../services/message';
import queries from './query-key-factory';

export const useCreateMessage = (paperId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        navigate(routes.rolling.detail(paperId));
        queryClient.invalidateQueries({ queryKey: queries.messages._def });
      }
    },
  });
};

export const usePaperMessagesQuery = (paperId?: number) => {
  return useQuery({
    ...queries.messages.paper(paperId),
    staleTime: 1000 * 60 * 60 * 6, // 삭제 바람!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    enabled: !!paperId,
  });
};

export const useUserMessagesQuery = () => {
  return useQuery({
    ...queries.messages.user(),
    staleTime: 1000 * 60 * 60,
  });
};

export const useDeleteMessage = ({ paperId }: { paperId: number }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (data) => {
      if (data.result === 'Success') {
        queryClient.invalidateQueries({
          queryKey: queries.messages.paper(paperId).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: queries.messages.user._def,
        });
      }
    },
  });
};
