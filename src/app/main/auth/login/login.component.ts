import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginModel } from '../../interfaces/login.model';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public userForm: FormGroup;
  public isLogin: boolean = false;
  public user: LoginModel;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          if(params.token){
            this.authService.verifyUser(params.token).subscribe(resData=>{
              console.log(resData);
              this.toasterService.showSuccess(resData,"Verified");
            },
            (error)=>{
              console.log(error);
              this.toasterService.showError(error,"Not Verified");
            });
          }
      });
    let email: string;
    let password: string;
    this.userForm = new FormGroup({
      'email': new FormControl(email,[
                    Validators.required,,
                    Validators.email,
                    Validators.pattern('^[a-z0-9_-]{6,16}$|^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
              ]),
      'password': new FormControl(password,Validators.required),
      'rememberMe': new FormControl('')
    });
  }
  onSubmitForm(){
    this.isLogin=true;
    console.log(this.userForm.value.email,this.userForm.value.password);
    
    this.authService.loginUser(this.userForm.value.email,this.userForm.value.password).subscribe(resData=>{
      console.log(resData);
      this.authService.user.next(resData);
      if(this.userForm.value.rememberMe){
        localStorage.setItem('userData', JSON.stringify(resData));
      }else{
        localStorage.setItem('userData', JSON.stringify(resData));
      }
      if(resData.register.type === 'admin') {
        this.toasterService.showSuccess('LoggedIn as '+resData.register.type,'Welcome '+resData.register.name);
        this.router.navigate(['/admin']);  
      }
      else {
        this.toasterService.showSuccess('LoggedIn as '+resData.register.type,'Welcome '+resData.register.name);
        //this.authService.autoLogout(+resData.expires_in);        
        this.router.navigate(['/account']);
      }
    },
    (error)=>{
      this.isLogin=false;
      console.log(error);
      this.toasterService.showError(error.error.error.error,'Error');
    });
  }

  onForgotPassword(){
    this.router.navigateByUrl(`/auth/forgot-password`);
  }

  onSignup(){
    this.router.navigateByUrl(`/auth/signup`);
  }

  onBack(){
    this.router.navigateByUrl('/home');
  }
}
