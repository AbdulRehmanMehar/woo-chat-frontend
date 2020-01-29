import { AddContactAction } from './../store/actions/contact.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AppState } from '../store/models/app-state.model';
import { ContactState } from '../store/models/contact.model';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  contactForm: FormGroup;
  state$: Observable<ContactState>;

  constructor(public store$: Store<AppState>){}

  private intializeForm() {
    this.contactForm = new FormGroup({

      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12)
      ]),
    });
  }

  ngOnInit() {
    this.intializeForm();
    this.state$ = this.store$.select(state => state.contact);
  }

  handleSubmission() {
    this.store$.dispatch(new AddContactAction(this.contactForm.value));
    this.contactForm.reset();
  }

}
