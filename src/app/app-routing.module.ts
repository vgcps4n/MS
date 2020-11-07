import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginContainerComponent} from "./login/container/login-container.component";
import {RegistrationContainerComponent} from "./registration/container/registration-container.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {ExaminationContainerComponent} from "./examination/container/examination-container.component";
import {NotFoundContainerComponent} from "./not-found-container/not-found-container.component";


const routes: Routes = [
  {
    path: '',
    component: RegistrationContainerComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'examination',
    component: ExaminationContainerComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginContainerComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
  {
    path: '404',
    component: NotFoundContainerComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
