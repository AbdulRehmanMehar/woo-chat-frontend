import { MessengerComponent } from './messenger/messenger.component';
import { ChatComponent } from './chat/chat.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home - WooChat'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login - WooChat'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register - WooChat'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'create-contact'
      },
      {
        path: 'create-contact',
        component: CreateContactComponent,
        data: {
          title: 'Create Contact - Dashboard - WooChat'
        }
      },

    ]
  },
  {
    path: 'chatroom',
    component: ChatComponent,
    data: {
      title: 'Chatroom - WooChat'
    },
    children: [
      {
        path: ':username',
        component: MessengerComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
