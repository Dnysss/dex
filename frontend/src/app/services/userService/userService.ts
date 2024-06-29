import api from "../../../utils/api";

interface UserResponse {
  name: string;
  email: string;
}

export const me = async (userId: number): Promise<UserResponse> => {
  const { data } = await api.get<UserResponse>(`/user/${userId}`);

  return data;
};
