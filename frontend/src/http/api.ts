import { api } from "./axios-client";
import { Tlogin, Tsignup } from "@/types";


// Authenticatio
export const singupMtFn = (payload:Tsignup)=>api.post('/api/auth/signup',payload)
export const loginMtFn = (payload:Tlogin)=>api.post('api/auth/login',payload)
export const selfQFn = ()=>api.get('/api/auth/self')


