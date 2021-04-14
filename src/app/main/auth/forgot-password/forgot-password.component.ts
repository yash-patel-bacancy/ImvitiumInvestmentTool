import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public userForm: FormGroup;
  
  constructor(private authService: AuthService,
              private toasterService: ToasterService,) { }

  ngOnInit(): void {
    
    let email: string;
    this.userForm = new FormGroup({
      'email': new FormControl(email,[
                    Validators.required,
                    Validators.email,
                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
                  ])
    });
  }

  onSubmitForm(){
    this.authService.forgotPassword(this.userForm.value.email).subscribe(resData=>{
      console.log(resData);
      this.toasterService.showSuccess(resData,"Email Sent");
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });
  }
}
