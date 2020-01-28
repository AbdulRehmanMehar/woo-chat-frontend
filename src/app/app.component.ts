import { AuthState } from './store/models/auth.model';
import { Observable } from 'rxjs';
import { AppState } from './store/models/app-state.model';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authState$: Observable<AuthState>;

  public constructor(
    private store: Store<AppState>,
    private titleService: Title,
    router: Router,
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = this.getTitle(
          router.routerState,
          router.routerState.root
        ).join('-');
        titleService.setTitle(title);
      }
    });
  }

  getTitle(state, parent) {
    let data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  ngOnInit() {
    this.authState$ = this.store.select(store => store.auth);
  }

}
