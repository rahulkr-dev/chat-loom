import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { singupMtFn } from "@/http/api";
import { singupSchema } from "@/schema/auth-schema";
import { Tsignup } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <Alert variant="destructive">
      {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
  );
};

const signup = async(payload:Tsignup)=>{
  const {data} = await singupMtFn(payload)
  return data
}

const SignupPage = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["auth/self"]})

    }
  });
  // todo - server error message
  
 
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
    <div className="w-screen h-screen flex justify-center items-center ">
      <Card className="lg:w-[50vw]">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create a new account to access all the features of our application.
            Fill in the required fields below to get started.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
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
              <ErrorMessage error="something wentwrong" />
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

export default SignupPage;
