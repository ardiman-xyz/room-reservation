"use client";

import React, {useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {useTransition} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas";

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
import CardWrapper from "@/components/auth/card-wrapper";
import {register} from "@/actions/register";


const RegisterForm = () => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
        email: "",
        name: "",
        password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
      setError("");
      setSuccess("")

        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        })
  };

  return (
   <CardWrapper headerLabel={"Create an account"} backButtonLabel={"Already have an account?"} backButtonHref={"/auth/login"}>
       <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <FormField
                   control={form.control}
                   name="name"
                   render={({ field }) => (
                       <FormItem>
                           <FormLabel>Nama</FormLabel>
                           <FormControl>
                               <Input placeholder="johndoe" {...field} autoFocus={true} disabled={isPending}  />
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
               />
               <FormField
                   control={form.control}
                   name="email"
                   render={({ field }) => (
                       <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                               <Input placeholder="example@gmail.com" {...field} disabled={isPending}  />
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
                                   placeholder="******"
                                   {...field}
                                   type="password"
                                   disabled={isPending}
                               />
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
               />
               <FormError message={error} />
               <FormSuccess message={success} />
               <Button type="submit" className="w-full" disabled={isPending}>
                   Submit
               </Button>
           </form>
       </Form>
   </CardWrapper>
  );
};

export default RegisterForm;
