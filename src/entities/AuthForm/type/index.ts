export type TypeForm = "auth" | "register";

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthForm extends Omit<RegisterForm, "username"> {}
