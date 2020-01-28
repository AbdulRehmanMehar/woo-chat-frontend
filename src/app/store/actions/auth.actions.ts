
import { Action } from '@ngrx/store';
import { RegisterCredentials, LoginCredentials, User, AuthResponseErrors } from './../models/auth.model';

export enum AuthActionTypes {
  LOGIN = '[AUTH] LOGIN',
  LOGOUT = '[AUTH] LOGOUT',
  REGISTER = '[AUTH] REGISTER',
  LOAD_AUTH = '[AUTH] LOAD_AUTH',
  LOGIN_FAILURE = '[AUTH] LOGIN_FAILURE',
  LOGIN_SUCCESS = '[AUTH] LOGIN_SUCCESS',
  REGISTER_FAILURE = '[AUTH] REGISTER_FAILURE',
  REGISTER_SUCCESS = '[AUTH] REGISTER_SUCCESS',
}

export class LoginAction implements Action {
  public readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: LoginCredentials) {}
}

export class RegisterAction implements Action {
  public readonly type = AuthActionTypes.REGISTER;

  constructor(public payload: RegisterCredentials) {}
}

export class LogoutAction implements Action {
  public readonly type = AuthActionTypes.LOGOUT;
}

export class LoadAuthAction implements Action {
  public readonly type = AuthActionTypes.LOAD_AUTH;
}

export class LoginFailureAction implements Action {
  public readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: AuthResponseErrors[]) {}
}

export class LoginSuccessAction implements Action {
  public readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: User) {}
}

export class RegisterFailureAction implements Action {
  public readonly type = AuthActionTypes.REGISTER_FAILURE;

  constructor(public payload: AuthResponseErrors[]) {}
}

export class RegisterSuccessAction implements Action {
  public readonly type = AuthActionTypes.REGISTER_SUCCESS;
}


// tslint:disable-next-line: no-unused-expression
export type AuthAction =
  LoginAction |
  LogoutAction |
  LoginFailureAction |
  LoginSuccessAction |
  RegisterAction |
  RegisterSuccessAction |
  RegisterFailureAction;
