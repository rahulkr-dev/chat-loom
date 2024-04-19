import { AuthCardWrapper } from "@/pages/auth/component/auth-card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginMtFn } from "@/http/api";
import { loginSchema } from "@/pages/auth/schema/auth-schema";
import { Tlogin } from "@/pages/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { AuthWrapper } from "@/pages/auth/component/auth-wrapper";
import { AuthButton } from "@/pages/auth/component/auth-button";
import { FormError } from "@/components/form-error";
import { getErrorMessage } from "@/lib/utils";
import { AxiosError } from "axios";
import {  useMemo } from "react";


const login = async (payload: Tlogin) => {
  const { data } = await loginMtFn(payload);
  return data;
};



const LoginPage = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending,error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth/self"] });
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });

  const serverError = useMemo(() => getErrorMessage(error as AxiosError), [error]);


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values);
  };
  return (
    <AuthWrapper>
      <AuthCardWrapper
        authLable="Welcome back to our community!"
        backButtonLabel="Don't have an account?"
        backButtonHref="/signup"
        authTitle="Chat Loom"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <FormError message={serverError} />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormItem>Email</FormItem>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="px-0 font-normal"
                    >
                      <Link to="/reset">Forgot password?</Link>
                    </Button>
                  </FormItem>
                )}
              />
            </div>

            <AuthButton isPending={isPending} buttonLabel="Login" />
          </form>
        </Form>
      </AuthCardWrapper>
    </AuthWrapper>
  );
};

export default LoginPage;
