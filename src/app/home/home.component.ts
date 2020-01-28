import { AppState } from './../store/models/app-state.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AuthState } from '../store/models/auth.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authState: Observable<AuthState>;

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.authState = this.store$.select(state => state.auth);
  }

}
