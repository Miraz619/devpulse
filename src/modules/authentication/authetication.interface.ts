
export interface Iuser{

    name :string;
    email: string;
    password: string;
    role?: 'contributor' | 'maintainer';


}

export interface Ilogin{
    email:string;
    password: string;
}