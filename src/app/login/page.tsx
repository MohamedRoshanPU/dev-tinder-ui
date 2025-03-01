"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { customGetRequest, customPostRequest } from "@/utils/networkActions";
import { useRouter } from "next/navigation";
import { formSchema } from "@/utils/schema/loginUserSchema";
import { useLogin } from "@/queries/authQueries";
import { toast } from "react-hot-toast";

const Login = () => {
  const { mutate: login, isPending } = useLogin();
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    login(values, {
      onSuccess(data) {
        toast.success(data?.message || "Successfully Loggedin");
        dispatch(
          setUser({
            email: data?.data?.email,
            firstName: data?.data?.firstName,
            id: data?.data?.id,
            lastName: data?.data?.lastName,
          })
        );
        router.push("/feed");
      },
    });
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email and password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <Label>Email</Label>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <Label>Password</Label>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                        className="mt-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
