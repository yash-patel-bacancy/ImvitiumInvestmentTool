import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { AdminService } from '../../services/admin.service';
import { LoadingSpinnerInterceptor } from '../interceptors/loadingspinner.interceptor';

@NgModule({
  providers: [
    AdminService,
    AuthService,
    [
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: LoadingSpinnerInterceptor, multi: true}
    ]
  ]
})
export class CoreModule { }