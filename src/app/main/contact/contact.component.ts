import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public userForm: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    let name: string;
    let email: string;
    let message: string;
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
      'message': new FormControl(message,Validators.required),
    });
  }

  onSubmitForm(){

  }

}
