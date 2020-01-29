import { User, AuthResponseErrors } from './auth.model';
export interface AddContactFormCredentials {
  phone: string;
}

export interface ContactState {
  loading: boolean;
  contacts?: User[];
  formError?: AuthResponseErrors[];
  loadError?: string;
}

export interface ContactResponseData {
  contacts?: User[];
  contact?: User;
}

export interface ContactResponse {
  message: string;
  success: boolean;
  data?: ContactResponseData;
  errors?: AuthResponseErrors[];
}
