import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatesModel } from '../../interfaces/updates.model';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public updates: UpdatesModel[]=[];
  public link:any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService:UserService,
              private authService: AuthService,
              private toasterService: ToasterService,
              private dom: DomSanitizer) { }

  ngOnInit(): void {
    this.userService.getUpdates().subscribe(resData=>{
      console.log(resData);
      this.updates=resData;
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });

    this.userService.getLink().subscribe(resData=>{
      this.link=this.dom.bypassSecurityTrustResourceUrl(resData);
    },
    (error)=>{
      console.log(error);
      this.toasterService.showError(error,'Error');
    });
  }

  public onLaunch(){
    if(this.authService.user){
      this.router.navigate(['/repository']);
    }
    this.router.navigate(['auth/login']);
  }

}
