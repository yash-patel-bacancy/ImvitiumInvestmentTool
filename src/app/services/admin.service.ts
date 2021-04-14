import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UpdatesModel } from '../interfaces/updates.model';
import { UserListModel } from '../interfaces/userlist.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public getUserList(pageNumber: number, searchString: string):Observable<UserListModel> {
    return this.http.get<UserListModel>(environment.baseURL+"userlist?page="+pageNumber+"&search="+searchString);
  }

  public getUserListByType(pageNumber: number, searchString: string, accountType: string):Observable<UserListModel> {
    return this.http.get<UserListModel>(environment.baseURL+"userlist/"+accountType+"?page="+pageNumber+"&search="+searchString);
  }

  public updateUser(id:number,accountType:string){
    return this.http.put(environment.baseURL+'userlist/'+id,{account_type : accountType});
  }

  public deleteUser(id:number){
    return this.http.delete(environment.baseURL+'userlist/'+id)
  }
  
  public getTotalSubscribed(){
    return this.http.get<number>(environment.baseURL+'total');
  }

  public getLink(){
    return this.http.get<string>(environment.baseURL+'link');
  }

  public setLink(link:string){
    return this.http.put(environment.baseURL+'link',{link:link});
  }

  public getUpdates(){
    return this.http.get<UpdatesModel[]>(environment.baseURL+'news');
  }

  public putUpdate(id:number,update:string){
    return this.http.put(environment.baseURL+'news/'+id,{id:id,news_update:update});
  }

  public postUpdate(update:string): Observable<UpdatesModel>{
    return this.http.post<UpdatesModel>(environment.baseURL+'news',{news_update:update});
  }

  public deleteUpdate(id:number){
    return this.http.delete(environment.baseURL+'news/'+id);
  }

  public deleteAllUpdates(){
    return this.http.delete(environment.baseURL+'newsall'); 
  }
}