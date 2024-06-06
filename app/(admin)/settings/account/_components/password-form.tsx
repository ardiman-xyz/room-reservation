"use client"

import {z} from "zod";
import {PasswordUserSchema, ProfileAccountSchema} from "@/schemas";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import React, {useState, useTransition} from "react";
import {User} from "@prisma/client";
import {toast} from "sonner";
import {updatePassword} from "@/actions/user";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";

interface AccountFormProps {
    user: User
}

export const PasswordForm = ({user}: AccountFormProps) => {

    const router = useRouter()

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof PasswordUserSchema>>({
        resolver: zodResolver(PasswordUserSchema),
        defaultValues: {
            currentPassword: "",
            password:  "",
            confirmPassword: "",
        }
    })

    function onSubmit(values: z.infer<typeof PasswordUserSchema>) {

        setError("");
        setSuccess("")

        startTransition(() => {
            updatePassword(values, user.id).then((data) => {
                setError(data?.error);
                if(data?.success) {
                    toast.success(data.success)
                    signOut({ callbackUrl: '/auth/login', redirect:true })
                }
            })
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>
                    Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password Lama</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="*****" {...field} disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password Baru</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="*****" {...field} disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Konfirmasi Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="*****" {...field} disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormError message={error}/>
                        <FormSuccess message={success}/>

                        <div className={"flex gap-2 mt-3"}>
                            <Button disabled={isPending} size={"sm"} className="h-8">Simpan</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}