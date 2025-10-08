import { useMutation } from '@tanstack/react-query';
import { RequestContent, requestContent, RequestContentResponse } from '../api/request-content';
import { enqueueSnackbar } from 'notistack';
import { AxiosResponse } from 'axios';

export function useContentRequest() {
  return useMutation<AxiosResponse<RequestContentResponse>, Error, RequestContent>({
    mutationFn: requestContent,
    onError: (error) => enqueueSnackbar(error.message, { variant: 'error' })
  });
}
