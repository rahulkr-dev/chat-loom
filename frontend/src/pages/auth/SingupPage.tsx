import { AuthCardWrapper } from "@/components/auth/auth-card-wrapper";
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
import { singupMtFn } from "@/http/api";
import { singupSchema } from "@/schema/auth-schema";
import { Tsignup } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { AuthWrapper } from "@/pages/auth/auth-wrapper";
import { AuthButton } from "@/components/auth/auth-button";
import { FormError } from "@/components/form-error";
import { useMemo } from "react";
import { AxiosError } from "axios";
import { getErrorMessage } from "@/lib/utils";

const signup = async (payload: Tsignup) => {
  const { data } = await singupMtFn(payload);
  return data;
};

const SignupPage = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending,error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth/self"] });
    },
  });

  const serverError = useMemo(() => getErrorMessage(error as AxiosError), [error]);


  const form = useForm<z.infer<typeof singupSchema>>({
    resolver: zodResolver(singupSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof singupSchema>) => {
    mutate(values);
  };
  return (
    <AuthWrapper>
      <AuthCardWrapper
        authLable="Thanks for choosing us! Let's begin."
        backButtonLabel="Have an account?"
        backButtonHref="/login"
        authTitle="Chat Loom"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormError message={serverError} />
            <div>
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  </FormItem>
                )}
              />
              <Button
                size="sm"
                variant="link"
                asChild
                className="px-0 font-normal"
              >
                <Link to="/reset">Forgot password?</Link>
              </Button>
            </div>

            <AuthButton isPending={isPending} buttonLabel="Signup" />
          </form>
        </Form>
      </AuthCardWrapper>
    </AuthWrapper>
  );
};

export default SignupPage;
