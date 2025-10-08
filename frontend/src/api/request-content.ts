import { api } from './config';
import { AxiosResponse } from 'axios';

export type RequestContent = {
  tone: string;
  religion: string;
  userInfo: string;
  caseId: string;
};

type RequestContentDto = {
  variables: {
    USER_INFO: string;
    TONE: string;
    RELIGION: string;
  };
};

export type RequestContentResponse = {
  finalPrompt: string;
  openaiResponse: string;
};

export async function requestContent({
  caseId,
  religion,
  tone,
  userInfo
}: RequestContent): Promise<AxiosResponse<RequestContentResponse>> {
  return await api.post<RequestContentResponse, undefined, RequestContentDto>(
    `${process.env.REACT_APP_API_URL}/api/memorial/${caseId}/openai`,
    { variables: { TONE: tone, USER_INFO: userInfo, RELIGION: religion } }
  );
}
