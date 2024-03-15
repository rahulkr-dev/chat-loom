import {create} from"zustand"
import { devtools } from 'zustand/middleware'

type AuthData = {
    name:string,
    email:string,
    username:string
}
interface IauthStore{
    auth:null | AuthData,
    add:(data:AuthData)=>void,
    logout:()=>void
}

export const useAuthStore = create<IauthStore>()(devtools((set)=>({
    auth:null,
    add: (data:AuthData) => set(() => ({ auth:data })),
    logout:()=>set(()=>({auth:null}))
})))