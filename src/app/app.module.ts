import { ContactEffects } from './store/effects/contact.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ChatComponent } from './chat/chat.component';
import { MessengerComponent } from './messenger/messenger.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';

import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './store/reducers/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ContactReducer } from './store/reducers/contact.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    CreateContactComponent,
    ChatComponent,
    MessengerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ auth: AuthReducer, contact: ContactReducer }),
    EffectsModule.forRoot([AuthEffects, ContactEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
