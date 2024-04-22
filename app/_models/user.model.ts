export interface User {
  userName: string;
  token: string;
  role: string | null; //  role can be either a string or null -> in this case NO admin
  lastName: string;
  firstName: string;
  password:string;
  _id: string;
}

export interface UserPayload {
  username: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
}