import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        return this.authService.user
        .pipe(take(1), 
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReqeust = req.clone({
                    headers: new HttpHeaders().set('authorization', "Bearer "+user.access_token)
                });
                return next.handle(modifiedReqeust);
            })
        );
    }
}