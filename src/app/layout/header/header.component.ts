import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn = false;
  public isUser:boolean = false;
  public route: any;
  constructor(private router: Router,
              private authService: AuthService,
              ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(res => {
      if(res) {
        if(res.register.type==="user"){
          this.isUser=true;
        }
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    });
  }

  onLogout() {
    this.isUser=false;
    this.loggedIn = false;
    this.authService.logout();
  }

  onBack(){
    this.router.navigateByUrl('/account');
  }

}
