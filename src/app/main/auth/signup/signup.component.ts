import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/interfaces/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public userForm: FormGroup;
  public subscription: Subscription;
  public user: UserModel;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private toasterService: ToasterService) { }

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
                  Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,12}/)
                ]),
      'confirmPassword': new FormControl(confirmPassword,[
                  Validators.required,
                  Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,12}/)
                ]),
    },this.passwordsMatchValidator
    );
  }

  private passwordsMatchValidator(form: FormGroup) {    
    if (form.get('password') && form.get('confirmPassword')) {
        return form.get('password').value === form.get('confirmPassword').value ? null : { mismatch: true };
    }
    return null;
}

  onSubmitForm(){
    this.setUser();
    this.subscription = this.authService
        .addUser(this.user)
        .subscribe((res) => {
          console.log(res);
            this.router.navigate(['auth/login']);
            this.toasterService.showSuccess(this.user.username,'New User is Added');
          },
          (error) => {
            console.log(error);
            this.userForm.reset();
            this.toasterService.showError('Error', error.error['email']);
          }
        );
  }

  private setUser() : void {
    this.user = {
      name: this.userForm.value.name,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };
  }
  onLogin(){
    this.router.navigateByUrl(`/auth/login`);
  }

}