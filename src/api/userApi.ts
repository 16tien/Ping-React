import axiosInstance from "../utils/axiosInstance";

export const getUserById = async (id: number) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data;
};

export const getAllNameUser = async () => {
  const res = await axiosInstance.get('users/username');
  return res.data;
}

export const getAllUsers = async (params: Record<string, string>) => {
  const res = await axiosInstance.get('/users', { params });
  return {
    data: res.data.users,
    total: res.data.total,
  };
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}) => {
  const res = await axiosInstance.post('users/addUser', data);
  return res.data;
};