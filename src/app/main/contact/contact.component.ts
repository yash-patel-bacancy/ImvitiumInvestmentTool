import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public userForm: FormGroup;
  
  constructor(private userService: UserService,
              private router: Router,
              private toasterService: ToasterService) { }

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

  public onContactClick(): void {
    window.open("https://discord.gg/XzAkM7qHYF","_blank");
  }

  onSubmitForm(){
    this.userService.sendContactDetails(this.userForm.value.name,this.userForm.value.email,this.userForm.value.message)
      .subscribe(resData=>{
        console.log(resData);
        this.router.navigate(['contact']);
      },
      (error)=>{
        console.log(error);
        this.toasterService.showError(error,'Error');
      });
  }

}
