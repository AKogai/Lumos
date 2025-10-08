import { useMutation } from '@tanstack/react-query';
import { RequestContent, requestContent, RequestContentResponse } from '../api/request-content';

export function useContentRequest() {
  return useMutation<RequestContentResponse, Error, RequestContent>({
    mutationFn: requestContent
  });
}
