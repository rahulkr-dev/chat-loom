import { selfQFn } from "@/http/api";
import { useAuthStore } from "@/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const getSelf = async () => {
  const { data } = await selfQFn();
  return data;
};

const RootLayout = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["auth/self"],
    queryFn: getSelf,
    retry: (failureCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
          return false;
      }
      return failureCount < 3;
  },
  });
  const { add } = useAuthStore();
  useEffect(() => {
    if (data) add(data);
  }, [data, add]);

  if (isLoading) return <div>Loading...</div>;
  return <Outlet />
};

export default RootLayout;
