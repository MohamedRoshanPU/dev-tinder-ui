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
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { customGetRequest, customPostRequest } from "@/utils/networkActions";
import cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import { formSchema } from "@/utils/schema/loginUserSchema";

const Login = () => {
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
    try {
      let res: any = await customPostRequest("/api/auth/login", values);
      if (res) {
        dispatch(
          setUser({
            email: res.data.email,
            id: res.data.id,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
          })
        );
        router.push("/feed");
      }
    } catch (error) {
      console.log(`page,  : error`, error);
    }
  };

  const getData = async () => {
    try {
      let data = await customGetRequest("/api/feed");
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
