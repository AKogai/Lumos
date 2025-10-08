import { api } from './config';

export type RequestContent = {
  tone: string;
  language: string;
  userInfo: string;
  caseId: string;
};

type RequestContentDto = {
  variables: {
    USER_INFO: string;
    TONE: string;
    LANGUAGE: string;
  };
};

export type RequestContentResponse = {
  finalPrompt: string;
  openaiResponse: string;
};

export async function requestContent({
  caseId,
  language,
  tone,
  userInfo
}: RequestContent): Promise<RequestContentResponse> {
  return await api.post<RequestContentResponse, undefined, RequestContentDto>(
    `${process.env.REACT_APP_API_URL}/api/memorial/${caseId}/openai`,
    { variables: { TONE: tone, USER_INFO: userInfo, LANGUAGE: language } }
  );
}
