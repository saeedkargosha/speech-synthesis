import { axiosInstance } from './axios-instance';

type SignUpType = {
  firstName: string;
  lastName: string;
  password: boolean;
};

const signUp = ({ firstName, lastName, password }: SignUpType) =>
  axiosInstance({
    method: 'POST',
    url: '/users/register',
    data: {
      firstName,
      lastName,
      password,
    },
  }).then((res) => res.data);

export const AuthService = {
  signUp,
};
