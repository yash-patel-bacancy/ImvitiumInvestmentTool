import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdatesModel } from 'src/app/interfaces/updates.model';
import { UserDataModel, UserListModel } from 'src/app/interfaces/userlist.model';
import { AdminService } from 'src/app/services/admin.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public searchQuery:string='';
  public currentPage:number=1;
  public userlist:UserListModel;
  public totalSubuscribed:number;
  public link='https://www.youtube.com/watch?v=Fdf5aTYRW0E';
  public totalPages: number[]=[];
  public totalPage: number;
  public accountType:string='';
  public updateForm:FormGroup;
  public allUpdates:FormArray;
  public newsList: UpdatesModel[];
  public editMode:boolean=false;
  public userEditForm: FormGroup;
  public accountTypes=['subscribe','unsubscribe','free']
  public editinguser: UserDataModel;

  constructor(private adminService: AdminService,
              private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.initForm();
    this.getUserList(this.currentPage,this.searchQuery);
    this.totalSubuscribedUser();
    this.getVideoLink();
    this.getUpdates();
  }

  private initForm() {
    this.allUpdates = new FormArray([]);
    this.updateForm=new FormGroup({
      updates: this.allUpdates
    });

    let accountType:string;
    this.userEditForm = new FormGroup({
      'username': new FormControl('value:username, disabled:true',Validators.required),
      'email': new FormControl('value:email, disabled:true',Validators.required),
      'accountType': new FormControl(accountType,Validators.required)
    });
  }

  public showDialog(i: number): void {
    this.editMode = true;
    this.editinguser = this.userlist[i];
    console.log(this.editinguser);
    
    setTimeout(() => {
      this.userEditForm.setValue({
        username: this.editinguser.username,
        email: this.editinguser.email,
        accountType: this.editinguser.account_type
      });
    });
  }

  public onSubmitEditedUser(): void {
    this.adminService.updateUser(this.editinguser.id,this.userEditForm.value.accountType).subscribe(res=>{
      console.log(res);
      this.totalSubuscribedUser();
      this.toasterService.showSuccess(res,"Sucessfull");
      this.onChangePage(1);
      this.editinguser = null;
      this.editMode = false;
    },
    (error)=>{
      console.log(error);
      this.editMode = false;
      this.toasterService.showError(error,'Error');
    });
  }

  get controls() {
    return (<FormArray>this.updateForm.get('updates')).controls;
  }

  public getPages(){
    return this.totalPages=Array(this.totalPage);
  }

  public onChangePage(page:number){
    switch(this.accountType){
      case 'subscribe': {
        this.getUserListByType(page,'subscribe',this.searchQuery);
        break;
      }
      case 'unsubscribe': {
        this.getUserListByType(page,'unsubscribe',this.searchQuery);
        break;
      }
      case 'free': {
        this.getUserListByType(page,'free',this.searchQuery);
        break;
      }
      default: {
        this.getUserList(page,this.searchQuery);
        break;
      }
    }
  }

  private getUserList(page: number, searchString: string): void {
    this.adminService.getUserList(page,searchString).subscribe((resData) => {
      this.userlist = resData.data['data'];
      this.totalPage = resData.data['last_page'];
    },
    (error) => {
      this.toasterService.showError(error.error, 'Something Went Wrong!');
    });
  }

  private getUserListByType(page: number, accountType: string, searchString:string): void {
    this.adminService.getUserListByType(page,searchString,accountType).subscribe((resData) => {
      this.userlist = resData.data['data'];
      this.totalPage = resData.data['last_page'];
    },
    (error) => {
      this.toasterService.showError(error.error, 'Something Went Wrong!');
    });
  }

  public onSelectAccountype(accountType: string): void {
    if(accountType == this.accountType) {
      this.accountType = '';
      this.currentPage = 1;
    }
    else {
      this.currentPage = 1;
      this.accountType = accountType;
    }
    this.onChangePage(1);
  }

  public onDeleteUser(index:number): void {
    this.adminService.deleteUser(this.userlist[index].id).subscribe(resData=>{
      console.log(resData);
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });
  }

  private getVideoLink(): void {
    this.adminService.getLink().subscribe(resData=>{
      this.link=resData;
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });
  }
  
  private totalSubuscribedUser(): void {
    this.adminService.getTotalSubscribed().subscribe(resData=>{
      this.totalSubuscribed=resData;
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });
  }

  public updateLink(): void {
    console.log(this.link);
    this.adminService.setLink(this.link).subscribe(resData=>{
      console.log(resData);
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });
  }

  private getUpdates(): void {
    this.adminService.getUpdates().subscribe((res)=>{
      console.log(res);
      this.newsList=res;
      for (let update of res){
        this.allUpdates.push(
          new FormGroup({
            update: new FormControl({value :update.news_update, disabled:true}, Validators.required)
          })
        );
      }
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });
  }

  public onAddUpdate(): void {
    if(this.allUpdates.length === 0) {      
      (<FormArray>this.updateForm.get('updates')).push(
        new FormGroup({
          'update': new FormControl({value:'', disabled:false}, [Validators.required])
        })
      );
    }
    else if(this.allUpdates.controls[this.allUpdates.length-1].value['update'] === '') {
      this.toasterService.showWarning('Please enter news in above feild','Warning',);
    } 
    else {
      if(this.allUpdates.length === this.newsList.length) {
        console.log("ll");
        (<FormArray>this.updateForm.get('updates')).push(
          new FormGroup({
            'update': new FormControl({value:'', disabled:false}, [Validators.required])
          })
        );  
      }
      else {
        this.toasterService.showWarning('Please save the above news','Warning',);
      }
    }
  }

  public onUpdate(index:number): void {
    console.log(index);
    console.log(this.allUpdates.controls[index].value);
    if(index>=this.newsList.length){
      this.adminService.postUpdate(this.allUpdates.controls[index].value['update']).subscribe(resData=>{
        this.allUpdates.controls[index].disable();
        this.newsList[index]=resData;
        this.toasterService.showSuccess("Added successfully","News");
        console.log(this.newsList);
        console.log(resData);
      },
      (error)=>{
        this.allUpdates.controls[index].enable();
        console.log(error);
        this.toasterService.showError("The news update must be at least 6 characters",'Error');
      });
    } else if(this.allUpdates.controls[index].disabled){
      this.allUpdates.controls[index].enable();
    } else {
      this.adminService.putUpdate(this.newsList[index].id,this.allUpdates.controls[index].value['update']).subscribe(resData=>{
        console.log(resData);
        this.toasterService.showSuccess(resData['message'],"Successfull");
        this.allUpdates.controls[index].disable();
      },
      (error)=>{
        console.log(error);
        this.allUpdates.controls[index].enable();
        this.toasterService.showError(error,'Error');
      }); 
    } 
  }

  public onDeleteUpdate(index:number): void {
    console.log((<FormArray>this.updateForm.get('updates')).controls[index].value['update']);
    console.log(this.newsList[index].id);
    
    this.adminService.deleteUpdate(this.newsList[index].id).subscribe(resData=>{
      console.log(resData);
      this.toasterService.showSuccess(resData['message'],"News");
      this.allUpdates.removeAt(index);
      this.newsList.splice(index,1);
      console.log(this.newsList);
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error.error.message,'Error');
    });
  }

  public onDeleteAllUpdates(): void {
    this.allUpdates.clear();
    this.adminService.deleteAllUpdates().subscribe(resData=>{
      console.log(resData);
      this.toasterService.showSuccess("Deleted all news","Successfully deleted");
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });
  }
}
