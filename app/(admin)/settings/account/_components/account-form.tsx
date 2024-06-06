"use client"

import {z} from "zod";
import {ProfileAccountSchema} from "@/schemas";

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
import {updateProfile} from "@/actions/user";
import {useRouter} from "next/navigation";

interface AccountFormProps {
    user: User
}

export const AccountForm = ({user}: AccountFormProps) => {

    const router = useRouter()

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof ProfileAccountSchema>>({
        resolver: zodResolver(ProfileAccountSchema),
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
        }
    })

    function onSubmit(values: z.infer<typeof ProfileAccountSchema>) {

        setError("");
        setSuccess("")

        startTransition(() => {
            updateProfile(values, user.id).then((data) => {
                setError(data?.error);
                if(data?.success) {
                    toast.success(data.success)
                    router.refresh()
                }
            })
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Informasi profil</CardTitle>
                <CardDescription>
                    Perbarui informasi profil dan alamat email akun Anda.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama..." {...field} disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email..." {...field} disabled={isPending}/>
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