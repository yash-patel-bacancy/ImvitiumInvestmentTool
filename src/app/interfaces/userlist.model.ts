export interface UserListModel{
    data:{
        id:number;
        name:string;
        email:string;
        username:string;
        type:string;
   }[],
}

export interface UserDataModel{
    id: number;
    name: string;
    email: string;
    username: string;
    type: string;
    account_type: string;
    date: string;
}