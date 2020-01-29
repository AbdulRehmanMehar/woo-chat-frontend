import { Observable, of } from 'rxjs';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IoService {
  private socket;
  private BASE_URL = environment.serverAddress;

  constructor() {
    this.socket = io(this.BASE_URL, {
      query: {
        token: JSON.parse(localStorage.getItem('authState')).user.token
      }
    });
  }

  listen(event: string) {
    return new Observable((subscriber) => {
      this.socket.on(event, data => {
        subscriber.next(data);
      });
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

}
