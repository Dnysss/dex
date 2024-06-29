import api from "../../../utils/api";

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
}

export async function signin(params: SigninParams) {
  const { data } = await api.post<SigninResponse>("/auth", params);
  
  return data;
}
