import { mergeMap, map, catchError } from 'rxjs/operators';
import { LoginAction, AuthActionTypes, LoginSuccessAction, LoginFailureAction, RegisterAction, RegisterSuccessAction, LogoutAction } from './../actions/auth.actions';
import { AuthService } from './../../services/auth.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';



@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService$: AuthService) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginAction>(AuthActionTypes.LOGIN),
    mergeMap(
      (data) => this.authService$.login(data.payload).pipe(
        map((resp) => new LoginSuccessAction(resp.data.user)),
        catchError((err) =>  of(new LoginFailureAction(err.error.errors)))
      )
    )
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType<RegisterAction>(AuthActionTypes.REGISTER),
    mergeMap(
      (data) => this.authService$.register(data.payload).pipe(
        map(resp => new RegisterSuccessAction()),
        catchError(err => of(new LoginFailureAction(err.error.errors)))
      )
    )
  );

  // @Effect()
  // logout$ = this.actions$.pipe(
  //   ofType<LogoutAction>(AuthActionTypes.LOGOUT),
  //   map(() => new LogoutAction())
  // );

}
