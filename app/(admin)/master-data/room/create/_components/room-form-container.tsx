"use client";

import React, { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormError from "@/components/form-error";
import { useRouter } from "next/navigation";

import FormSuccess from "@/components/form-success";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoomSchema } from "@/schemas";
import { Building, Floor } from "@prisma/client";
import { create } from "@/actions/room";
import { getAllByBuildingId } from "@/data/floor";

interface IProps {
  buildings: Building[];
}

export const RoomFormContainer = ({ buildings }: IProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [floors, setFloors] = useState<Floor[] | []>([]);

  const form = useForm<z.infer<typeof RoomSchema>>({
    resolver: zodResolver(RoomSchema),
    defaultValues: {
      building: "",
      floor: "",
      name: "",
    },
  });

  const { watch, getValues, formState, reset } = form;
  const building = watch("building");

  useEffect(() => {
    if (building) {
      getAllByBuildingId(building).then((data) => {
        if (data) {
          setFloors(data);
        }
      });
    }
  }, [building]);

  function onSubmit(values: z.infer<typeof RoomSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      create(values).then((data) => {
        setError(data?.error);
        if (data?.success) {
          reset();
          setSuccess(data?.success);
          router.refresh();
        }
      });
    });
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih gedung" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {buildings.map((building) => (
                      <SelectItem key={building.id} value={building.id}>
                        {building.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lantai</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lantai" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {floors.map((floor) => (
                      <SelectItem key={floor.id} value={floor.id}>
                        {floor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Lantai 1..."
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <div className={"flex gap-2"}>
            <Button asChild variant="outline" size="sm" className="h-8">
              <Link href={"/master-data/room"}>Batal</Link>
            </Button>
            <Button disabled={isPending} size={"sm"} className="h-8">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
