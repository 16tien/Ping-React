export interface LoginFormValues {
  username: string;
  password: string;
}


export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface LoginResponse {
  user: User;
  message: string;
}
