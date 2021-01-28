import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public userForm: FormGroup;
  
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let name: string;
    let email: string;
    let username: string;
    let password: string;
    let confirmPassword: string;
    this.userForm = new FormGroup({
      'name': new FormControl(name,[
                  Validators.required,
                  Validators.minLength(3),
                  Validators.pattern('^[a-zA-Z]{3,}$')
                ]),
      'email': new FormControl(email,[
                  Validators.required,
                  Validators.email,
                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
                ]),
      'username': new FormControl(username,[
                  Validators.required,
                  Validators.pattern('^[a-z0-9_-]{6,16}$')
                ]),
      'password': new FormControl(password,[
                  Validators.required,
                  Validators.minLength(8),
                  Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,12}$')
                ]),
      'confirmPassword': new FormControl(confirmPassword,Validators.required)
    },this.passwordsMatchValidator);
  }

  private passwordsMatchValidator(form: FormGroup) {
    if (form.get('password') && form.get('confirmPassword')) {
        return form.get('password').value === form.get('confirmPassword').value ? null : { mismatch: true };
    }
    return null;
}

  onSubmitForm(){

  }

  onLogin(){
    this.router.navigateByUrl(`/main/auth/login`);
  }

}
