import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from './../store/models/auth.model';
import { LoginAction } from './../store/actions/auth.actions';
import { AppState } from './../store/models/app-state.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  state$: Observable<AuthState>;
  loginForm: FormGroup;

  constructor(private store$: Store<AppState>, private router$: Router) {}

  private intializeForm() {
    this.loginForm = new FormGroup({

      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12)
      ]),
    });
  }

  ngOnInit() {
    this.intializeForm();
    this.state$ = this.store$.select(store => store.auth);
  }

  handleLogin() {
    this.store$.dispatch(new LoginAction(this.loginForm.value));
    this.loginForm.reset();
    this.router$.navigate(['']);
  }
}
