import { selfQFn } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSelf = () =>
  useQuery({
    queryKey: ["auth/self"],
    queryFn: async () => (await selfQFn()).data,
    retry: (count, error) => !(error instanceof AxiosError && error.response?.status === 401) && count < 3
  });
