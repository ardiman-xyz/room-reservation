"use client";

import React, {useState, useTransition} from "react";

import { z } from "zod"
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {Input} from "@/components/ui/input";
import {update} from "@/actions/building";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

import {formCreate} from "@/schemas/building";
import {Building} from "@prisma/client";

interface IProps {
    defaultData: Building
}

export const EditBuildingForm = ({ defaultData }: IProps) => {

    const router = useRouter()

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof formCreate>>({
        resolver: zodResolver(formCreate),
        defaultValues: {
            name: defaultData.name,
        },
    })

    function onSubmit(values: z.infer<typeof formCreate>) {
        setError("");
        setSuccess("")

        startTransition(() => {
            update(values, defaultData.id).then((data) => {
                setError(data?.error);
                if(data?.success) {
                    setSuccess(data?.success);
                    router.refresh()
                }
            })
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[500px]">
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