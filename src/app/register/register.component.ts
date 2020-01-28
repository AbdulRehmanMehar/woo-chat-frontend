import { AuthState } from './../store/models/auth.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../store/models/app-state.model';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { RegisterAction } from '../store/actions/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  state$: Observable<AuthState>;
  registerForm: FormGroup;

  constructor(private store$: Store<AppState>) {}

  private intializeForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      passwordConfirmation: new FormControl(''),
    });
  }

  ngOnInit() {
    this.intializeForm();
    this.state$ = this.store$.select(state => state.auth);
  }

  handleRegistration() {
    this.store$.dispatch(new RegisterAction(this.registerForm.value));
  }

}
