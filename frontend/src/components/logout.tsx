import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { logoutMFn } from "@/http/api";
import { useAuthStore } from "@/store/useAuthStore";

const Logout = () => {
  const { logout } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await logoutMFn();
    },
    onSuccess: () => {
      logout();
    },
  });
  return (
    <Button disabled={isPending} onClick={() => mutate()}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Logout"
      )}
    </Button>
  );
};

export default Logout;
