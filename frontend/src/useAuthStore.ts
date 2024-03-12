import {create} from"zustand"

type AuthData = {
    name:string,
    email:string,
    username:string
}
interface IauthStore{
    auth:null | AuthData,
    add:(data:AuthData)=>void
}

export const useAuthStore = create<IauthStore>()((set)=>({
    auth:null,
    add: (data:AuthData) => set(() => ({ auth:data })),
}))