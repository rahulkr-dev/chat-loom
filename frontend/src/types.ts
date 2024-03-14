export type Tlogin = {
    email:string,
    password:string
}

export type Tsignup = {
    email:string,
    password:string,
    name:string,
    username:string
}

export interface IBackendError {
    errors: Array<{ msg: string; path: string }>;
  }