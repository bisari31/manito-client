import { DeatultResponse } from '../types/axios';
import { User } from '../types/user';
import { requester } from '.';

export const changeNickname = async (nickname: string) => {
  const { data } = await requester.post<DeatultResponse<null>>(
    '/user/nickname',
    {
      nickname,
    },
  );
  return data;
};

export const getUser = async () => {
  const { data } = await requester.post<DeatultResponse<User>>('/user/info');
  return data;
};

export const logout = async () => {
  const { data } = await requester<DeatultResponse<null>>('/user/logout');
  return data;
};
