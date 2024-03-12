import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { loginSchema, } from "@/schema/auth-schema";
import { Tlogin } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const login = async(payload:Tlogin)=>{
  const {data} = await loginMtFn(payload)
  return data;
}

const LoginPage = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["auth/self"]})
    },
    onError:(error)=>{
      console.log(error,"error")
    }
  });
  // todo - server error message
  
 
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
    <div className="w-screen h-screen flex justify-center items-center ">
      <Card className="lg:w-[50vw]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Create a new account to access all the features of our application.
            Fill in the required fields below to get started.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
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
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full ">
                Signup
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
