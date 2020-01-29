import { Router } from '@angular/router';
import { Message } from './../store/models/io.model';
import { IoService } from './../services/io.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadContactsAction } from './../store/actions/contact.actions';
import { map } from 'rxjs/operators';
import { User } from './../store/models/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/models/app-state.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  search: FormGroup;
  contacts$: Observable<User[]>;

  constructor(private store$: Store<AppState>, private io$: IoService, public router$: Router) { }

  filterContacts() {
    const data = this.search.get('field').value;
    if (data) {
      this.contacts$ = this.contacts$.pipe(
        map(users => {
          users = users.filter(user => user.name.includes(data) || user.username.includes(data))
          return users;
        })
      );
    }
  }

  ngOnInit() {
    this.store$.dispatch(new LoadContactsAction());
    this.contacts$ = this.store$.select(state => state.contact.contacts);

    this.search = new FormGroup({
      field: new FormControl('')
    });

    this.io$.listen('message').subscribe((resp: Message) => {
      let count = 1;
      this.contacts$ = this.contacts$.pipe(
        map((users: User[], mapIdx) => {
          users.forEach((user, idx) => {
            if (user.id.toString() == resp.sender_id && count === 1) {
              users[idx].unreadMessages = users[idx].unreadMessages || 0;
              if ((users[idx].unreadMessages || users[idx].unreadMessages === 0)) {
                users[idx].unreadMessages++;
              }
              count++;
            }
          });
          return users;
        })
      );
    });
  }

}
