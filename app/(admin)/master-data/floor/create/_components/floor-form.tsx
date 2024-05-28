"use client";

import React, {useState, useTransition} from "react";
import { z } from "zod"
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import FormError from "@/components/form-error";
import {useRouter} from "next/navigation";

import FormSuccess from "@/components/form-success";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {FloorSchema} from "@/schemas";
import {Building} from "@prisma/client";
import { create } from "@/actions/floor"

interface IProps {
    buildings: Building[]
}

export const FloorForm = ({buildings}: IProps) => {

    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof FloorSchema>>({
        resolver: zodResolver(FloorSchema),
        defaultValues: {
            building: "",
            name: "",
        },
    });

    function onSubmit(values: z.infer<typeof FloorSchema>) {
        setError("");
        setSuccess("")

        startTransition(() => {
            create(values).then((data) => {
                setError(data?.error);
                if(data?.success) {
                    form.reset();
                    setSuccess(data?.success);
                    router.refresh()
                }
            })
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="building"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gedung</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih gedung" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            buildings.map((building) => (
                                                <SelectItem key={building.id} value={building.id}>{building.name}</SelectItem>
                                            ))
                                        }

                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nama</FormLabel>
                                <FormControl>
                                    <Input placeholder="Lantai 1..." {...field} disabled={isPending}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormError message={error}/>
                    <FormSuccess message={success}/>

                    <div className={"flex gap-2"}>
                        <Button asChild variant="outline" size="sm" className="h-8">
                            <Link href={"/master-data/floor"}>
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

