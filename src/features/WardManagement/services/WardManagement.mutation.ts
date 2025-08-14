import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWard, deleteWard, updateWard } from './WardManagement.api';

export const useCreateWard = () => {
  const queryClient = useQueryClient();
  return useMutation(createWard, {
    onSuccess: (response) => {
      console.log('createWard: ', response);
      queryClient.refetchQueries(['getWardList']);
    },
  });
};

export const useUpdateWard = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWard, {
    onSuccess: (response) => {
      console.log('updateWard: ', response);
      queryClient.refetchQueries(['getWardList']);
    },
  });
};

export const useDeleteWard = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteWard, {
    onSuccess: (response) => {
      console.log('deleteWard: ', response);
      queryClient.refetchQueries(['getWardList']);
    },
  });
};
