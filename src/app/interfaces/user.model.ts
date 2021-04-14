export interface UserModel {
  id?: string,
  name: string;
  email: string;
  username: string,
  password: string;
  type?: string,
  account_type?: string,
  date?: string,
  email_verified?: number,
  created_at?: string,
  updated_at?: string,
  record_deleted?: number
}