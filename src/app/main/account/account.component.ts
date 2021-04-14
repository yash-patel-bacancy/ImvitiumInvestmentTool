import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdatesModel } from 'src/app/interfaces/updates.model';
import { UserModel } from 'src/app/interfaces/user.model';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  public isLogin:true;
  public editMode: boolean = false;
  public userForm: FormGroup;
  public subscription: Subscription;
  public user: UserModel;
  public updates: UpdatesModel[]=[];
  constructor(private router: Router,
              private toasterService: ToasterService,
              private userService: UserService) { }

  ngOnInit(): void {
    let email: string;
    let username: string;
    email=JSON.parse(localStorage.getItem('userData')).register.email;
    username=JSON.parse(localStorage.getItem('userData')).register.username;
    this.userForm = new FormGroup({
      'email': new FormControl(email,[
                  Validators.required,
                  Validators.email,
                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
                ]),
      'username': new FormControl(username,[
                  Validators.required,
                  Validators.pattern('^[a-z0-9_-]{6,16}$')
                ])
    });
    this.userForm.controls['username'].disable();
    this.userForm.controls['email'].disable();
  
    this.userService.getUpdates().subscribe(resData=>{
      console.log(resData);
      this.updates=resData;
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });
  }

  private disableControls(){
    this.userForm.controls['username'].disable();
    this.userForm.controls['email'].disable();
  }

  private enableControls(){
    this.userForm.controls['username'].enable();
    this.userForm.controls['email'].enable();
  }

  onSubmitForm(){
    this.isLogin=true;
    console.log(JSON.parse(localStorage.getItem('userData')).register.username);
    
    this.userService.updateUser(JSON.parse(localStorage.getItem('userData')).register.id,this.userForm.value.username,this.userForm.value.email)
    .subscribe(resData=>{
      console.log(resData);
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });

    this.disableControls();
    this.editMode=false;
  }

  onEdit(){
    this.editMode=true;
    this.enableControls();
  }

  public onLaunch(){
    this.router.navigate(['/repository']);
  }

  public onCancel(){
    this.editMode=false;
    this.disableControls();
    this.router.navigate(['/account']);
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}
