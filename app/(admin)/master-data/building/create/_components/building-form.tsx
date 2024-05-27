"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {Input} from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Input harus di isi"
    }).max(50),
})

export const BuildingForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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
                                    <Input placeholder="Gedung A..." {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className={"flex gap-2"}>
                        <Button asChild variant="outline" size="sm" className="h-8">
                            <Link href={"/master-data/building"}>
                                Batal
                            </Link>
                        </Button>
                        <Button size={"sm"} className="h-8">Save</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}