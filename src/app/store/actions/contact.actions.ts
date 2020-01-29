import { User, AuthResponseErrors } from './../models/auth.model';
import { AddContactFormCredentials } from './../models/contact.model';
import { Action } from '@ngrx/store';


export enum ContactActionTypes {
  ADD_CONTACT = '[CONTACT] ADD_CONTACT',
  LOAD_CONTACTS = '[CONTACT] LOAD_CONTACTS',
  ADD_CONTACT_FAILURE = '[CONTACT] ADD_CONTACT_FAILURE',
  ADD_CONTACT_SUCCESS = '[CONTACT] ADD_CONTACT_SUCCESS',
  LOAD_CONTACT_FAILURE = '[CONTACT] LOAD_CONTACT_FAILURE',
  LOAD_CONTACT_SUCCESS = '[CONTACT] LOAD_CONTACT_SUCCESS'
}

export class AddContactAction implements Action {
  readonly type = ContactActionTypes.ADD_CONTACT;

  constructor(public payload: AddContactFormCredentials) {}
}

export class AddContactFailureAction implements Action {
  readonly type = ContactActionTypes.ADD_CONTACT_FAILURE;

  constructor(public payload: AuthResponseErrors[]) {}
}

export class AddContactSuccessAction implements Action {
  readonly type = ContactActionTypes.ADD_CONTACT_SUCCESS;

  constructor(public payload: User) {}
}

export class LoadContactsAction implements Action {
  readonly type = ContactActionTypes.LOAD_CONTACTS;
}

export class LoadContactFailureAction implements Action {
  readonly type = ContactActionTypes.LOAD_CONTACT_FAILURE;

  constructor(public payload: AuthResponseErrors[]) {}
}

export class LoadContactSuccessAction implements Action {
  readonly type = ContactActionTypes.LOAD_CONTACT_SUCCESS;

  constructor(public payload: User[]) {}
}


export type ContactAction = AddContactAction |
AddContactFailureAction |
AddContactSuccessAction |
LoadContactsAction |
LoadContactFailureAction |
LoadContactSuccessAction;
