import { AuthState } from './auth.model';

export interface AppState {
  readonly auth: AuthState;
}
