import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {

  constructor(private loading: LoadingSpinnerService, private tostr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loading.show();
    
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => { 
      if (event instanceof HttpResponse) {
        this.loading.hide();
      }
    },
    (err: any) => {
      this.loading.hide();
      
    }));
  }
}