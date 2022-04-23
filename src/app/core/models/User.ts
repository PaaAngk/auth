export interface AuthUser{
    username: string;
    password: string;
    access_token: string;
}
export interface User {
    username: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    full_name: string;
    id: number;
  }
  