export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface UserInfoType {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}
