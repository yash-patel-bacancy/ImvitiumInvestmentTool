import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public userForm: FormGroup;
  public isLogin: boolean = false;
  public resetPassword:boolean=false;
  public token:string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService:AuthService,
              private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          if(params.token){
            console.log("reset");
            
            this.resetPassword=true;
            this.token=params.token;
          }
          else{
            this.resetPassword=false;
          }
        }
      );
    let oldPassword: string;
    let newPassword: string;
    let confirmPassword: string;
    this.userForm = new FormGroup({
      'oldPassword': new FormControl(oldPassword,[
                    Validators.required,
                    Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,12}/)
              ]),
      'newPassword': new FormControl(newPassword,[
                    Validators.required,
                    Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,12}/)
              ]),
      'confirmPassword': new FormControl(confirmPassword,Validators.required)
    },this.passwordsMatchValidator);
  }
        
  private passwordsMatchValidator(form: FormGroup) {
    if (form.get('newPassword') && form.get('confirmPassword')) {
      return form.get('newPassword').value === form.get('confirmPassword').value ? null : { mismatch: true };
    }
    return null;
  }

  onSubmitForm(){
    this.isLogin=true;
    console.log(this.userForm.value.newPassword);
    
    if(this.resetPassword){
      this.authService.resetPassword(this.token,this.userForm.value.newPassword).subscribe(resData=>{
        console.log(resData);
        this.toasterService.showSuccess(resData,"Successfull");
        this.router.navigate['/auth/login'];
      },
      (error)=>{
        console.log(error);
        this.toasterService.showError(error,"Password didn't Reset");
      });
    }else{
      this.authService.changePassord(JSON.parse(localStorage.getItem('userData')).id,this.userForm.value.oldPassword,this.userForm.value.newPassword)
      .subscribe(resData=>{
        console.log(resData);  
        this.toasterService.showSuccess("Successfull","Password Changed");
        this.router.navigateByUrl('/account');
      },
      (error)=>{
        console.log(error);
        this.toasterService.showError(error,'Error');
      });
    }
  }

}
