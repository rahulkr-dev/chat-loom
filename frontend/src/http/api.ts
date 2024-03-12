import { z } from "zod";
import { api } from "./axios-client";
import { singupSchema } from './../schema/auth-schema';
import { Tlogin } from "@/types";


// Authenticatio
export const singupMtFn = (payload:z.infer<typeof singupSchema>)=>api.post('/api/auth/signup',payload)
export const loginMtFn = (payload:Tlogin)=>api.post('api/auth/login',payload)
export const selfQFn = ()=>api.get('/api/auth/self')


