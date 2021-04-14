import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpdatesModel } from '../interfaces/updates.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public sendContactDetails(name:string,email:string,message:string){
    return this.http.post(environment.baseURL+'contact',{name:name,email:email,message:message});
  }

  public updateUser(id:number,username: string, email:string){
    return this.http.put(environment.baseURL+'user/'+id,{email:email,username:username});
  }

  public getUpdates(){
    return this.http.get<UpdatesModel[]>(environment.baseURL+'news');
  }

  public getLink(){
    return this.http.get<string>(environment.baseURL+'link');
  }

}
