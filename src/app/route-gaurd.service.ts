import { map } from 'rxjs/operators';
import { AuthState } from './store/models/auth.model';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AppState } from './store/models/app-state.model';

@Injectable({
  providedIn: 'root'
})
export class RouteGaurdService implements CanActivate {

  authState$: Observable<AuthState>;

  constructor(private store$: Store<AppState>) {
    this.authState$ = this.store$.select(state => state.auth);
  }

  canActivate(): Observable<boolean> {
    return this.authState$.pipe(
      map(state => state.authenticated)
    );
  }
}
