import { ContactState } from './../models/contact.model';
import { ContactAction, ContactActionTypes } from '../actions/contact.actions';

const initialState: ContactState = {
  loading: false,
  contacts: [],
  formError: undefined
};

export function ContactReducer(state: ContactState = initialState, action: ContactAction) {
  switch (action.type) {
    case ContactActionTypes.ADD_CONTACT:
      state.loading = true;
      state.formError = undefined;
      return state;

    case ContactActionTypes.ADD_CONTACT_SUCCESS:
      state.loading = false;
      state.formError = undefined;
      state.contacts.push(action.payload);
      return state;

    case ContactActionTypes.ADD_CONTACT_FAILURE:
      state.loading = false;
      state.formError = action.payload;
      return state;

    case ContactActionTypes.LOAD_CONTACTS:
      state.loading = true;
      state.formError = undefined;
      return state;

    case ContactActionTypes.LOAD_CONTACT_SUCCESS:
      state.loading = false;
      state.formError = undefined;
      state.contacts = action.payload;
      return state;

    case ContactActionTypes.LOAD_CONTACT_FAILURE:
      state.loading = false;
      state.formError = undefined;
      state.loadError = 'Loading Error Occured';
      return state;

    default:
      return state;
  }
}
