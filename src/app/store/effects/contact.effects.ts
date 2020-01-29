import { ContactService } from './../../services/contact.service';
import { LoadContactsAction, ContactActionTypes, LoadContactSuccessAction, LoadContactFailureAction, AddContactAction, AddContactSuccessAction, AddContactFailureAction } from './../actions/contact.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';



@Injectable()
export class ContactEffects {

  constructor(private actions$: Actions, private contactService$: ContactService) {}

  @Effect()
  loadContacts$ = this.actions$.pipe(
    ofType<LoadContactsAction>(ContactActionTypes.LOAD_CONTACTS),
    mergeMap(_ => this.contactService$.loadContacts().pipe(
      map(resp => new LoadContactSuccessAction(resp.data.contacts)),
      catchError((err) =>  of(new LoadContactFailureAction(err.error.errors)))
    ))
  );

  @Effect()
  createContact$ = this.actions$.pipe(
    ofType<AddContactAction>(ContactActionTypes.ADD_CONTACT),
    mergeMap(data => this.contactService$.createContact(data.payload).pipe(
      map(resp => new AddContactSuccessAction(resp.data.contact)),
      catchError(err => of(new AddContactFailureAction(err.error.errors)))
    ))
  );

}
