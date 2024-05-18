import { api } from "./axios-client";
import { Tlogin, Tsignup } from "@/pages/auth/types";

// Authenticatio
export const singupMtFn = (payload: Tsignup) => api.post("/api/auth/signup", payload);
export const loginMtFn = (payload: Tlogin) => api.post("api/auth/login", payload);
export const selfQFn = () => api.get("/api/auth/self");
export const logoutMFn = () => api.post("/api/auth/logout");

// get user api
// /auth/users?page=2&limit=2
export const getAllUserQfn = (query:string)=>api.get(`/api/auth/users${query}`)
