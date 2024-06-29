import api from "../../../utils/api";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
}

export async function signup(params: SignupParams) {
  const { data } = await api.post<SignupResponse>("/user", params);

  return data;
}
