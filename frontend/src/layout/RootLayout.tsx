import { ChatPageSkeleton } from "@/components/skeleton/chat-skeleton";
import { useSelf } from "@/lib/query/auth-query";
import { useAuthStore } from "@/useAuthStore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";


const RootLayout = () => {
  const { data, isLoading,isFetching,isPending,} = useSelf()
  const { add } = useAuthStore();
  console.log({data,isLoading,isFetching,isPending})
  useEffect(() => {
    console.log("working or not")
    if (data) add(data);
  }, [data, add,isFetching]);

  if (isLoading) return <ChatPageSkeleton />
  return <Outlet />
};

export default RootLayout;
