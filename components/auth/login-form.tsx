"use client";

import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Key } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { LoginSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
  };

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle className="text-4xl flex items-center justify-center gap-x-2 mb-2">
          <Key className="h-8 w-8 font-bold" />
          <span>Login</span>
        </CardTitle>
        <CardDescription className="text-center">
          Selamat datang
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError />
              <FormSuccess message="Login successfully" />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="my-4 text-center text-sm">
          Peraturan penggunaan sistem {""}
          <Link href="#" className="underline text-blue-600">
            baca disini
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
