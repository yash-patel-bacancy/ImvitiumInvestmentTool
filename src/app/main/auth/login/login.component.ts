import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public userForm: FormGroup;
  
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let usernameEmail: string;
    let password: string;
    this.userForm = new FormGroup({
      'usernameEmail': new FormControl(usernameEmail,[
                    Validators.required,,
                    Validators.email,
                    Validators.pattern('^[a-z0-9_-]{6,16}$|^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
              ]),
      'password': new FormControl(password,Validators.required),
    });
  }
  onSubmitForm(){

  }

  onForgotPassword(){
    this.router.navigateByUrl(`/main/auth/forgot-password`);
  }

  onSignup(){
    this.router.navigateByUrl(`/main/auth/signup`);

  }
}
