import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginContainerComponent} from "./login/container/login-container.component";
import {RegistrationContainerComponent} from "./registration/container/registration-container.component";


const routes: Routes = [
  {
    path: '',
    component: RegistrationContainerComponent
  },
  {
    path: 'login',
    component: LoginContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
