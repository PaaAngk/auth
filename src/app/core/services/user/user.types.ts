export interface User
{
    id: number;
    username: string;
    email: string;
    access_token: string;
    is_active: boolean;
    is_superuser: boolean;
    full_name: string;
}
