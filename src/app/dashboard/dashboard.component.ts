import { LoadContactsAction } from './../store/actions/contact.actions';
import { Router } from '@angular/router';
import { LogoutAction, LoadAuthAction } from './../store/actions/auth.actions';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/models/app-state.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private store$: Store<AppState>, private router$: Router) { }

  logout() {
    this.store$.dispatch(new LogoutAction());
    this.router$.navigate(['']);
  }

  ngOnInit() {
  }

}
