export interface LoginFormValues {
  username: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  message: string;
}
