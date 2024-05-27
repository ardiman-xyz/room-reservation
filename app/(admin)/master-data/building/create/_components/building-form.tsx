"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {Input} from "@/components/ui/input";
import Link from "next/link";
import {formCreate} from "@/schemas/building";
import React, {useState, useTransition} from "react";
import {create} from "@/actions/building";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";


export const BuildingForm = () => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof formCreate>>({
        resolver: zodResolver(formCreate),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: z.infer<typeof formCreate>) {
        setError("");
        setSuccess("")

        startTransition(() => {
            create(values).then((data) => {
                setError(data?.error);
                if(data?.success) {
                    form.reset();
                    setSuccess(data?.success);
                }
            })
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nama</FormLabel>
                                <FormControl>
                                    <Input placeholder="Gedung A..." {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <div className={"flex gap-2"}>
                        <Button asChild variant="outline" size="sm" className="h-8">
                            <Link href={"/master-data/building"}>
                                Batal
                            </Link>
                        </Button>
                        <Button disabled={isPending} size={"sm"} className="h-8">Save</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}