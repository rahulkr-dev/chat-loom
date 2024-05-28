import { User } from "@/pages/chat/types"
import {create} from"zustand"
import { devtools } from 'zustand/middleware'


interface IchatStore{
  chatList:User[],
  add:(data:User)=>void
}

export const useChatStore = create<IchatStore>()(devtools((set)=>({
    chatList:[],
    add: (chat:User) => set((store) => ({ chatList:[...store.chatList,chat] })),
   
})))