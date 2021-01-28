import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public userForm: FormGroup;
  
  constructor() { }

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

  }

}
