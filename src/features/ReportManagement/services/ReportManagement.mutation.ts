import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReport, updateReport, uploadFileReport } from './ReportManagement.api';

export const useCreateReport = () => {
  const queryClient = useQueryClient();
  return useMutation(createReport, {
    onSuccess: (response) => {
      console.log('createReport: ', response);
      queryClient.refetchQueries(['getReportFilter']);
    },
  });
};

export const useUpdateReport = () => {
  const queryClient = useQueryClient();
  return useMutation(updateReport, {
    onSuccess: (response) => {
      console.log('updateReport: ', response);
      queryClient.refetchQueries(['getReportFilter']);
    },
  });
};

export const useUploadFileReport = () => {
  return useMutation(uploadFileReport, {
    onSuccess: (response) => {
      console.log('uploadFileReport: ', response);
    },
  });
};
