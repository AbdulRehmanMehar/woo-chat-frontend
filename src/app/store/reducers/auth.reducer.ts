import { AuthAction, AuthActionTypes } from './../actions/auth.actions';
import { AuthState } from './../models/auth.model';

const rawState = localStorage.getItem('authState');

let initialState: AuthState = {
  loading: false,
  authenticated: false,
  loginError: undefined,
  registerError: undefined,
};

if (rawState) {
  initialState = JSON.parse(rawState);
}

export function AuthReducer(state: AuthState = initialState, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.LOGIN || AuthActionTypes.REGISTER:
      state.loading = true;
      state.loginError = undefined;
      state.authenticated = false;
      delete state.user;
      return state;

    case AuthActionTypes.LOGIN_SUCCESS:
      state.loading = false;
      state.authenticated = true;
      state.user = action.payload;
      state.loginError = undefined;
      localStorage.setItem('authState', JSON.stringify(state));
      return state;

    case AuthActionTypes.LOGIN_FAILURE || AuthActionTypes.REGISTER_FAILURE:
      state.loading = false;
      state.authenticated = false;
      delete state.user;
      (action.type === AuthActionTypes.LOGIN_FAILURE) ?
      state.loginError = action.payload : state.registerError = action.payload;
      return state;

    case AuthActionTypes.LOGOUT:
      state.loading = false;
      state.loginError = undefined;
      state.authenticated = false;
      delete state.user;
      localStorage.removeItem('authState');
      return state;

    case AuthActionTypes.REGISTER_SUCCESS:
      state.loading = false;
      state.authenticated = false;
      state.loginError = undefined;
      delete state.user;
      return state;

    default:
      return state;
  }
}
