import { z } from "zod";
import { api } from "./axios-client";
import { singupSchema } from './../schema/auth-schema';


// Authenticatio
export const singupMtFn = (payload:z.infer<typeof singupSchema>)=>api.post('/api/auth/signup',payload)