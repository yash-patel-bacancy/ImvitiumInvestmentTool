import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../interfaces/user.model';
import { LoginModel } from '../interfaces/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  public user =new BehaviorSubject<LoginModel>(null);

  constructor(private http: HttpClient, 
              private router: Router) {}

  public addUser(user:UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(environment.baseURL+'register1',user);
  }
  
  public loginUser(email: string, password: string): Observable<LoginModel> {
    return this.http.post<LoginModel>(environment.baseURL+'login', {email: email,password: password});
  }

  public autoLogin() {
    const userData: LoginModel = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    if (userData.access_token) {
      this.user.next(userData);
      this.router.navigate(['/account']);                
      //this.autoLogout(+userData.expires_in);
    }
  }

  public logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('userData');
  }

  public autoLogout(expirationDuration: number):void{
    setTimeout(()=> {
      localStorage.removeItem('userData');
      this.user.next(null);
      this.router.navigate(['/tokenExpired']);
    },expirationDuration);
  }

  public verifyUser(token:string){
    return this.http.post(environment.baseURL+'register1/verify',{token:token});
  }
  
  public changePassord(id:number,oldPassword:string,newPassword:string){
    return this.http.put(environment.baseURL+'change_password/'+id,{old_password:oldPassword,new_password:newPassword});
  }

  public forgotPassword(email:string){
    return this.http.post(environment.baseURL+'forgot_password',{email:email})
  }

  public resetPassword(token:string, password:string){
    return this.http.put(environment.baseURL+'resetpassword',{token:token,new_password:password});
  }
}