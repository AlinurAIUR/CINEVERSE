export interface User {
  name: string;
  lastName: string;
  email: string;
  password:string,
  gender: Gender;
  country: Country;
  comment: string;
  agree: boolean;
}

type Gender = 'male' | 'female';
type Country = 'kz' | 'us' | 'uk';
