"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { create } from "@/actions/booking";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

import { formCreate } from "@/schemas/building";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BookingSchema } from "@/schemas";

interface IProps {
  id: string;
}

const FormReservationRoom = ({ id }: IProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      roomId: id,
      date_start: "",
      time_start: "",
      date_end: "",
      time_end: "",
      purpose: "",
    },
  });

  function onSubmit(values: z.infer<typeof BookingSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      create(values).then((data) => {
        setError(data?.error);
        if (data?.success) {
          form.reset();
          setSuccess(data?.success);
          router.refresh();
        }
      });
    });
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Form Peminjaman</CardTitle>
          <CardDescription>
            Silahkan lengkapi form diawah, untuk melakukan proses peminjaman.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-x-3">
                <FormField
                  control={form.control}
                  name="date_start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Mulai</FormLabel>
                      <FormControl className="flex items-center gap-x-4">
                        <Input
                          {...field}
                          type="date"
                          disabled={isPending}
                          className="w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time_start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu Mulai</FormLabel>
                      <FormControl className="flex items-center gap-x-4">
                        <Input
                          {...field}
                          type="time"
                          disabled={isPending}
                          className="w-max"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-x-3">
                <FormField
                  control={form.control}
                  name="date_end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Berakhir</FormLabel>
                      <FormControl className="flex items-center gap-x-4">
                        <Input
                          {...field}
                          type="date"
                          disabled={isPending}
                          className="w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time_end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu Berakhir</FormLabel>
                      <FormControl className="flex items-center gap-x-4">
                        <Input
                          {...field}
                          type="time"
                          disabled={isPending}
                          className="w-max"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keperluan</FormLabel>
                    <FormControl className="flex items-center gap-x-4">
                      <Textarea {...field} placeholder="Kegiatan ini..." />
                    </FormControl>
                    <FormDescription>
                      Silahkan deskripsikan keperluan anda
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className={"flex gap-2"}>
                <Button asChild variant="outline" size="sm" className="h-8">
                  <Link href={"/booking/create"}>Batal</Link>
                </Button>
                <Button disabled={isPending} size={"sm"} className="h-8">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormReservationRoom;
