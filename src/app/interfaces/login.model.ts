import { UserModel } from "./user.model";

export interface LoginModel {
    access_token: string;
    email: string;
    expires_in: string;
    register: UserModel;
    token_type: string;
}