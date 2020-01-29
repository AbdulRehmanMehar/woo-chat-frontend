import { ContactState } from './contact.model';
import { AuthState } from './auth.model';

export interface AppState {
  readonly auth: AuthState;
  readonly contact: ContactState;
}
