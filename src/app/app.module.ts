import { BrowserModule } from '@angular/platform-browser';
import {forwardRef, Injectable, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { HeaderContainerComponent } from './header/container/header-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { RegistrationContainerComponent } from './registration/container/registration-container.component';
import {LoginContainerComponent} from "./login/container/login-container.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {environment} from "../environments/environment";
import {AuthService} from "./auth.service";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MsTableComponent } from './libs/ms-table/ms-table.component';
import {MatIconModule} from "@angular/material/icon";
import { RegistrationDialogComponent } from './registration/component/registration-dialog/registration-dialog.component';
import { ConfirmDialogComponent } from './libs/confirm-dialog/confirm-dialog.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import { DatePickerComponent } from './libs/inputs/date-picker/date-picker.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ExaminationContainerComponent } from './examination/container/examination-container.component';
import { NotFoundContainerComponent } from './not-found-container/not-found-container.component';
import { ExaminationDialogComponent } from './examination/component/examination-dialog/examination-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { LoadingComponent } from './loader/container/loading.component';
import { SpinnerComponent } from './loader/component/spinner/spinner.component';
import {OverlayService} from "./loader/overlay/overlay.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`,
      },
    });
    return next.handle(request);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginContainerComponent,
    HeaderContainerComponent,
    RegistrationContainerComponent,
    MsTableComponent,
    RegistrationDialogComponent,
    ConfirmDialogComponent,
    DatePickerComponent,
    ExaminationContainerComponent,
    NotFoundContainerComponent,
    ExaminationDialogComponent,
    LoadingComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatSnackBarModule,
  ],
  entryComponents: [
    RegistrationDialogComponent,
    ConfirmDialogComponent
  ],
  providers: [
    AppService,
    {provide: 'baseUrl', useValue: environment.baseUrl},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: OverlayService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

