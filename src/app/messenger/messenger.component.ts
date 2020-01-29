import { User } from './../store/models/auth.model';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AppState } from '../store/models/app-state.model';
import { Message, ConversationResponse } from '../store/models/io.model';
import { IoService } from '../services/io.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit, AfterViewChecked  {

  @ViewChild('scrollMe', null) private myScrollContainer: ElementRef;


  private urlParam: string;
  public user$: Observable<User>;
  public messages$: Message[];
  public form: FormGroup;

  constructor(private route$: ActivatedRoute, private store$: Store<AppState>, private router$: Router, private io$: IoService ){}

  ngOnInit() {
    this.urlParam = this.route$.snapshot.paramMap.get('username');
    this.router$.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.urlParam = this.route$.snapshot.paramMap.get('username');
        this.userObs();
        this.webSocks();
      }
    });
    this.userObs();
    this.webSocks();
    this.form = new FormGroup({
      field: new FormControl('', [Validators.required])
    });
  }

  userObs() {
    this.user$ = this.store$.select(state => state.contact.contacts).pipe(
      map((contacts: User[]) => {
        let user: User = contacts.filter((user: User) => user.username === this.urlParam)[0];
        return user;
      })
    );
  }

  webSocks() {
    this.user$.subscribe(usr => {
      if (usr) {
        this.io$.emit('conversation', {
          reciever: usr.id
        });
      }
    });
    this.io$.listen('conversation').subscribe((resp: ConversationResponse) => {
      this.messages$ = resp.data.conversation;
    });
    this.io$.listen('message').subscribe((resp: Message) => {
      this.messages$.push(resp);
    });

  }

  sendMessage() {
    this.user$.subscribe(usr => {
      if (usr) {
        let message: Message = {
          receiver_id: `${usr.id}`,
          sender_id: JSON.parse(localStorage.getItem('authState')).user.id,
          message: this.form.get('field').value
        };
        this.io$.emit('message', {
          reciever: usr.id,
          sender: JSON.parse(localStorage.getItem('authState')).user.id,
          message: this.form.get('field').value
        });
        this.messages$.push(message);

      }
    });
    this.form.reset();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }


}
