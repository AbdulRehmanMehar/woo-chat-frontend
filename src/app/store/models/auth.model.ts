export interface User {
  id: number;
  name: string;
  phone: string;
  token?: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  username: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthResponseErrors {
  msg: string;
  param: string;
  location?: string;
}

export interface AuthReponseData {
  user?: User;
}

export interface AuthResponse {
  message: string;
  success: boolean;
  data?: AuthReponseData;
  errors?: AuthResponseErrors[];
}

export interface AuthState {
  user?: User;
  loading: boolean;
  authenticated: boolean;
  loginError?: AuthResponseErrors[];
  registerError?: AuthResponseErrors[];
}
