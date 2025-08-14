import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProvince, deleteProvince, updateProvince } from './ProvinceManagement.api';

export const useCreateProvince = () => {
  const queryClient = useQueryClient();
  return useMutation(createProvince, {
    onSuccess: (response) => {
      console.log('createProvince: ', response);
      queryClient.refetchQueries(['getProvinceList']);
    },
  });
};

export const useUpdateProvince = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProvince, {
    onSuccess: (response) => {
      console.log('updateProvince: ', response);
      queryClient.refetchQueries(['getProvinceList']);
    },
  });
};

export const useDeleteProvince = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProvince, {
    onSuccess: (response) => {
      console.log('deleteProvince: ', response);
      queryClient.refetchQueries(['getProvinceList']);
    },
  });
};
