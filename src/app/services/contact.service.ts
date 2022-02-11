import { async } from '@angular/core/testing';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ContactResponse, AddContactFormCredentials } from '../store/models/contact.model';
import { AppState } from '../store/models/app-state.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  private BASE_URL = 'https://woochat-backend.herokuapp.com';

  constructor(private http: HttpClient) {

  }

  loadContacts() {
    return this.http.get<ContactResponse>(`${this.BASE_URL}/protected/contacts`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('authState')).user.token
      }
    });
  }

  createContact(credentials: AddContactFormCredentials) {

    return this.http.post<ContactResponse>(`${this.BASE_URL}/protected/contact`, credentials, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('authState')).user.token
      }
    });
  }

}
